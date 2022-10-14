import { inject } from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, post, Request, requestBody, Response, response, RestBindings
} from '@loopback/rest';
import fs from 'fs';
import { promisify } from 'util';
import Mocha from 'mocha';
import multer from 'multer';
import { Test, TestResult } from '../models';
import { ApiRepository, MethodRepository, TestGroupRepository, TestRepository, TestResultRepository } from '../repositories';
import { wrapper } from '../utils/wrapper';
import { MethodController } from './method.controller';

export class AdditionalController {
  constructor(
    @repository(TestRepository)
    public testRepository: TestRepository,
    @repository(TestGroupRepository)
    public testGroupRepository: TestGroupRepository,
    @repository(MethodRepository)
    public methodRepository: MethodRepository,
    @repository(ApiRepository)
    public apiRepository: ApiRepository,
    @repository(TestResultRepository)
    public testResultRepository: TestResultRepository,
  ) { }

  @post('/apis/{id}/json')
  @response(200, {
    description: 'TestResult model instance',
    content: { 'application/json': { schema: getModelSchemaRef(TestResult) } },
  })
  async apiMethods(
    @requestBody({
      description: 'multipart/form-data value.',
      required: true,
      content: {
        'multipart/form-data': {
          // Skip body parsing
          'x-parser': 'stream',
          schema: { type: 'object' },
        },
      },
    })
    request: Request,
    @param.path.number('id') id: number,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<any> {
    const storage = multer.memoryStorage();
    const upload = multer({ storage });

    const promise = new Promise<any>((resolve, reject) => {
      upload.any()(request, response, err => {
        if (err) return reject(err);
        else {
          resolve({
            files: request.files,
            fields: (request as any).fields,
          });
        }
      });
    });

    const file = await promise;

    const json = JSON.parse(file.files[0].buffer.toString());
    const routes = json.paths;
    const schemas = json.components.schemas;

    // build endpoints
    for (let route in routes) {
      let method = {
        apiId: id,
        methodName: "",
        methodRoute: "",
        methodType: "",
        methodBody: "{}",
        methodHeader: "{}"
      }

      method.methodRoute = route;
      const methods = routes[route];
      for (let methodType in methods) {
        method.methodType = (methodType).toUpperCase();
        method.methodName = methods[methodType].operationId;

        if (methods[methodType].requestBody && Object.keys(methods[methodType].requestBody.content).includes("application/json")) {
          method.methodHeader = JSON.stringify({
            "Content-Type": "application/json"
          });

          const content = methods[methodType].requestBody.content;
          let modelName = content["application/json"].schema.$ref;
          const auxName = modelName.split('/');
          modelName = auxName[auxName.length - 1];

          for (let schema in schemas) {
            if (schema == modelName) {
              const modelBody: any = {};
              const keys = Object.keys(schemas[schema].properties);
              for (let key of keys) {
                modelBody[key] = schemas[schema].properties[key].type;
              }

              method.methodBody = JSON.stringify(modelBody);
            }
          }
        }
      }

      // create method in DB
      const methodController = new MethodController(this.methodRepository);
      const createdMethod = await wrapper(methodController.create(method));
      if (createdMethod.error) {
        throw createdMethod.error;
      }
    }
  }


  async testWriter(
    path: string,
    content: string,
  ): Promise<any> {
    const outputResult = fs.writeFileSync(path, content);
    const done = "done";
    return done;
  }

  async testReader(
    path: string,
  ): Promise<any> {
    const outputResult = fs.readFileSync(path);
    const output = JSON.parse(outputResult.toString());
    return output;
  }


  @get('/test-groups/{id}/run')
  @response(200, {
    description: 'Run Test Group model instance Tests',
    content: { 'application/json': { schema: getModelSchemaRef(Test) } },
  })
  async runTestgroup(
    @param.path.number('id') id: number,
  ): Promise<any> {
    let mocha = new Mocha();
    let result: any = {
      passes: [],
      failures: [],
      pending: []
    };

    // find testGroup instance
    const testGroup = await wrapper(this.testGroupRepository.findById(id));
    if (testGroup.error) {
      throw testGroup.error;
    }

    // finds test instance
    const tests = await wrapper(this.testRepository.find({ where: { test_groupId: id } }));
    if (tests.error) {
      throw tests.error;
    }

    // find method instance
    const method = await wrapper(this.methodRepository.findById(testGroup.data.methodId));
    if (method.error) {
      throw method.error;
    }

    // find api instance
    const api = await wrapper(this.apiRepository.findById(method.data.apiId));
    if (api.error) {
      throw api.error;
    }

    // sets files name and path
    const fileName = await testGroup.data.testGroupName.replace(/\s/g, '');
    const testFile = `src/__tests__/acceptance/${fileName}_id${testGroup.data.id}.test.js`;
    const outputFile = `src/__tests__/acceptance/${fileName}_id${testGroup.data.id}.json`;

    // writes test
    const requirements = `const testlab = require('@loopback/testlab');
    const axios = require('axios');\n`;

    let describe: string = "";
    let expected: string = "";
    const closeString = `\n});`;

    describe = `describe('${method.data.methodName} tests', async () => {
      describe('${testGroup.data.testGroupName} tests', async () => {\n`

    // appends each test to create tests
    for (let test of tests.data) {
      expected = expected + `it('${test.testName}', async () => {
        const res = await axios.${method.data.methodType.toLowerCase()}("${api.data.apiDomain}${method.data.methodRoute}");\n`;
      expected = expected + test.testExpect + closeString + '\n';
    };

    expected = expected.replace(/expect/gi, "testlab.expect");
    const content = requirements + describe + expected + closeString + closeString;

    // writes test file
    await fs.promises.writeFile(testFile, content);

    // runs
    mocha.reporter('json', { output: outputFile });
    mocha.addFile(testFile);
    // needs this comand to delete cache after every test run
    // else it blocks the result and the array is empty

    mocha.suite.on('require', function (global, file) {
      delete require.cache[file];
    });

    const runner = mocha.run();

    return new Promise((resolve, reject) => {
      runner.on('end', async () => {
        runner.removeAllListeners('end');

        // builds test result
        // TODO: having problems when reading file when file didn't previously exist
        const outputResult = await fs.promises.readFile(outputFile);
        const output = JSON.parse(outputResult.toString());

        await wrapper(this.testGroupRepository.updateById(testGroup.data.id, {
          testGroupStart: output.stats.start,
          testGroupEnd: output.stats.end,
          testGroupDuration: output.stats.duration
        }));

        // passes array
        for (let test of output.passes) {
          const currentTest = await wrapper(this.testRepository.findOne({
            where: {
              testName: test.title
            }
          }));

          const testResult = {
            testId: currentTest.data.id,
            result_typeId: 1,
            resultTitle: test.title,
            resultDuration: test.duration,
            resultSpeed: test.speed,
            resultError: test.err.message,
            resultDate: (new Date()).toISOString()
          }

          const createdResult = await wrapper(this.testResultRepository.create(testResult));
          if (createdResult.error) {
            reject(createdResult.error);
          }

          await result.passes.push(createdResult.data);
        }

        // failures array
        for (let test of output.failures) {
          const currentTest = await wrapper(this.testRepository.findOne({
            where: {
              testName: test.title
            }
          }));

          const testResult = {
            testId: currentTest.data.id,
            result_typeId: 2,
            resultTitle: test.title,
            resultDuration: test.duration,
            resultSpeed: test.speed,
            resultError: test.err.message,
            resultDate: (new Date()).toISOString()
          }

          const createdResult = await wrapper(this.testResultRepository.create(testResult));
          if (createdResult.error) {
            reject(createdResult.error);
          }

          await result.failures.push(createdResult.data);
        }

        // pending array
        for (let test of output.pending) {
          const currentTest = await wrapper(this.testRepository.findOne({
            where: {
              testName: test.title
            }
          }));

          const testResult = {
            testId: currentTest.data.id,
            result_typeId: 3,
            resultTitle: test.title,
            resultDuration: test.duration,
            resultSpeed: test.speed,
            resultError: test.err.message,
            resultDate: (new Date()).toISOString()
          }

          const createdResult = await wrapper(this.testResultRepository.create(testResult));
          if (createdResult.error) {
            reject(createdResult.error);
          }

          await result.pending.push(createdResult.data);
        }

        const latestResults = await wrapper(this.findLatestResults(testGroup.data.id));
        if (latestResults.error) {
          reject(latestResults.error);
        }

        // delete file here

        resolve(latestResults.data);
        // return result;
      });
    });
  }

  @get('/tests/{id}/run')
  @response(200, {
    description: 'Run Test model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Test) } },
  })
  async runTest(
    @param.path.number('id') id: number,
  ): Promise<any> {
    let mocha = new Mocha();
    let result: any;

    // finds test instance
    const test = await wrapper(this.testRepository.findById(id));
    if (test.error) {
      throw test.error;
    }

    // find testGroup instance
    const testGroup = await wrapper(this.testGroupRepository.findById(test.data.test_groupId));
    if (testGroup.error) {
      throw testGroup.error;
    }

    // find method instance
    const method = await wrapper(this.methodRepository.findById(testGroup.data.methodId));
    if (method.error) {
      throw method.error;
    }

    // find api instance
    const api = await wrapper(this.apiRepository.findById(method.data.apiId));
    if (api.error) {
      throw api.error;
    }

    // sets files name and path
    const fileName = await test.data.testName.replace(/\s/g, '');
    const testFile = `src/__tests__/acceptance/${fileName}_id${test.data.id}.test.js`;
    const outputFile = `src/__tests__/acceptance/${fileName}_id${test.data.id}.json`;

    // writes test
    const requirements = `const testlab = require('@loopback/testlab');
    const axios = require('axios');\n`;

    const describe = `describe('${method.data.methodName} tests', async () => {
      describe('${testGroup.data.testGroupName} tests', async () => {
        it('${test.data.testName}', async () => {
          const res = await axios.${method.data.methodType.toLowerCase()}("${api.data.apiDomain}${method.data.methodRoute}");\n`;

    let expected = test.data.testExpect;
    expected = await expected.replace(/expect/gi, "testlab.expect");

    const closeString = `\n});`;

    const content = requirements + describe + expected + closeString + closeString + closeString;

    await fs.promises.writeFile(testFile, content);

    // runs
    mocha.reporter('json', { output: outputFile });
    mocha.addFile(testFile);
    // needs this comand to delete cache after every test run
    // else it blocks the result and the array is empty
    mocha.suite.on('require', function (global, file) {
      delete require.cache[file];
    });
    const runner = mocha.run();

    return new Promise((resolve, reject) => {
      runner.on('end', async () => {
        runner.removeAllListeners('end');

        // builds test result
        // TODO: having problems when reading file when file didn't previously exist
        const outputResult = await fs.promises.readFile(outputFile);
        const output = JSON.parse(outputResult.toString());

        await wrapper(this.testGroupRepository.updateById(testGroup.data.id, {
          testGroupStart: output.stats.start,
          testGroupEnd: output.stats.end,
          testGroupDuration: output.stats.duration
        }));

        for (let test of output.passes) {
          const currentTest = await wrapper(this.testRepository.findOne({
            where: {
              testName: test.title
            }
          }));
          const testResult = {
            testId: currentTest.data.id,
            result_typeId: 1,
            resultTitle: test.title,
            resultDuration: test.duration,
            resultSpeed: test.speed,
            resultError: test.err.message,
            resultDate: (new Date()).toISOString()
          }

          const createdResult = await wrapper(this.testResultRepository.create(testResult));
          if (createdResult.error) {
            reject(createdResult.error);
          }

          result = createdResult.data;
        }

        for (let test of output.failures) {
          const currentTest = await wrapper(this.testRepository.findOne({
            where: {
              testName: test.title
            }
          }));
          const testResult = {
            testId: currentTest.data.id,
            result_typeId: 2,
            resultTitle: test.title,
            resultDuration: test.duration,
            resultSpeed: test.speed,
            resultError: test.err.message,
            resultDate: (new Date()).toISOString()
          }

          const createdResult = await wrapper(this.testResultRepository.create(testResult));
          if (createdResult.error) {
            reject(createdResult.error);
          }

          result = createdResult.data;
        }

        for (let test of output.pending) {
          const currentTest = await wrapper(this.testRepository.findOne({
            where: {
              testName: test.title
            }
          }));
          const testResult = {
            testId: currentTest.data.id,
            result_typeId: 3,
            resultTitle: test.title,
            resultDuration: test.duration,
            resultSpeed: test.speed,
            resultError: test.err.message,
            resultDate: (new Date()).toISOString()
          }

          const createdResult = await wrapper(this.testResultRepository.create(testResult));
          if (createdResult.error) {
            reject(createdResult.error);
          }

          result = createdResult.data;
        }

        resolve(result);
      });
    });
  }

  @get('/tests/{id}/testresults')
    @response(200, {
      description: 'Array of TestResult model instances',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: getModelSchemaRef(TestResult, { includeRelations: true }),
          },
        },
      },
    })
    async latest(
    @param.path.number('id') id: number,
    // @param.filter(TestResult) filter?: Filter<TestResult>,
  ): Promise < TestResult > {
      const whereFilter: any = {
        where: {
          testId: id
        },
        order: ['testResultDate DESC']
      };

      const latestResult = await wrapper(this.testResultRepository.findOne(whereFilter));
      if(latestResult.error) {
      throw latestResult.error;
    }

    return latestResult.data;
  }

  @get('/test-groups/{id}/latest-results')
  @response(200, {
    description: 'Latest TestResult model instance',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TestResult),
        },
      },
    },
  })
  async findLatestResults(
    @param.path.number('id') id: number,
  ): Promise<any[]> {
    const testsFilter = {
      where: {
        test_groupId: id,
      }
    };

    const tests = await wrapper(this.testRepository.find(testsFilter));
    if (tests.error) {
      throw tests.error;
    }

    let auxTests: any[] = [];

    for (let test of tests.data) {

      let auxTest = await Object.assign({}, test);

      const resultFilter = {
        where: {
          testId: test.id,
        },
        order: ['resultDate DESC']
      }

      const latestResult = await wrapper(this.testResultRepository.findOne(resultFilter));
      if (latestResult.error) {
        throw latestResult.error;
      }

      auxTest.latestResult = latestResult.data;

      auxTests.push(auxTest);
    }

    return auxTests;
  }
}
