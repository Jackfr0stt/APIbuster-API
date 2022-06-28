import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, response
} from '@loopback/rest';
import fs from 'fs';
import Mocha from 'mocha';
import {Test, TestResult} from '../models';
import {ApiRepository, MethodRepository, TestGroupRepository, TestRepository, TestResultRepository} from '../repositories';
import {wrapper} from '../utils/wrapper';

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

  @get('/tests/{id}/run')
  @response(200, {
    description: 'Test model instance',
    content: {'application/json': {schema: getModelSchemaRef(Test)}},
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
    const testGroup = await wrapper(this.testGroupRepository.findById(test.data.testGroupId));
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
    const fileName = await test.data.testname.replace(/\s/g, '');
    const testFile = `src/__tests__/acceptance/${fileName}.test.js`;
    const outputFile = `src/__tests__/acceptance/${fileName}.json`;

    // writes test
    const requirements = `const testlab = require('@loopback/testlab');
    const axios = require('axios');\n`;

    const describe = `describe('${method.data.method} tests', async () => {
      describe('${testGroup.data.testGroupname} tests', async () => {
        it('${test.data.testname}', async () => {
          const res = await axios.${method.data.methodtype.toLowerCase()}("${api.data.domain}${method.data.route}");\n`;

    let expected = test.data.testexpect;
    expected = await expected.replace(/expect/gi, "testlab.expect");

    const closeString = `\n});`;

    const content = requirements + describe + expected + closeString + closeString + closeString;

    await fs.promises.writeFile(testFile, content);

    // runs
    mocha.reporter('json', {output: outputFile});
    mocha.addFile(testFile);
    // needs this comand to delete cache after every test run
    // else it blocks the result and the array is empty
    mocha.suite.on('require', function (global, file) {
      delete require.cache[file];
    });
    mocha.run();

    // builds test result
    // TODO: having problems when reading file when file didn't previously exist
    const outputResult = await fs.promises.readFile(outputFile);
    const output = JSON.parse(outputResult.toString());

    await wrapper(this.testGroupRepository.updateById(testGroup.data.id, {
      testGroupStart: output.stats.start,
      testGroupEnd: output.stats.end,
      testGroupDuration: output.stats.duration
    }));

    console.log("passes: ", output.passes);

    for (let test of output.passes) {
      const currentTest = await wrapper(this.testRepository.findOne({
        where: {
          testName: test.title
        }
      }));
      const result = {
        testId: currentTest.data.id,
        testtypeId: 1,
        resultTitle: test.title,
        resultDuration: test.duration,
        resultSpeed: test.speed,
        resultError: JSON.stringify(test.err)
      }

      console.log("test_result: ", result);
      const testResult = await wrapper(this.testResultRepository.create(result));
      if (testResult.error) {
        throw testResult.error;
      }
    }

    return result;
  }

  @get('/tests/{id}/testresults')
  @response(200, {
    description: 'Array of TestResult model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TestResult, {includeRelations: true}),
        },
      },
    },
  })
  async latest(
    @param.path.number('id') id: number,
    // @param.filter(TestResult) filter?: Filter<TestResult>,
  ): Promise<TestResult> {
    const whereFilter: any = {
      where: {
        testId: id
      },
      order: ['testResultDate DESC']
    };

    const latestResult = await wrapper(this.testResultRepository.findOne(whereFilter));
    if (latestResult.error) {
      throw latestResult.error;
    }

    return latestResult.data;
  }
}
