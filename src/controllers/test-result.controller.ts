import {
  Count,
  CountSchema, FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {TestResult} from '../models';
import {TestResultRepository} from '../repositories';

export class TestResultController {
  constructor(
    @repository(TestResultRepository)
    public testResultRepository: TestResultRepository,
  ) { }

  @post('/test-results')
  @response(200, {
    description: 'TestResult model instance',
    content: {'application/json': {schema: getModelSchemaRef(TestResult)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestResult, {
            title: 'NewTestResult',
            exclude: ['id'],
          }),
        },
      },
    })
    testResult: Omit<TestResult, 'id'>,
  ): Promise<TestResult> {
    return this.testResultRepository.create(testResult);
  }

  @get('/test-results/count')
  @response(200, {
    description: 'TestResult model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TestResult) where?: Where<TestResult>,
  ): Promise<Count> {
    return this.testResultRepository.count(where);
  }

  @get('/test-results')
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
  async find(
    @param.where(TestResult) where?: Where<TestResult>,
  ): Promise<TestResult[]> {
    let whereFilter: any = where;
    return this.testResultRepository.find(whereFilter);
  }

  @patch('/test-results')
  @response(200, {
    description: 'TestResult PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestResult, {partial: true}),
        },
      },
    })
    testResult: TestResult,
    @param.where(TestResult) where?: Where<TestResult>,
  ): Promise<Count> {
    return this.testResultRepository.updateAll(testResult, where);
  }

  @get('/test-results/{id}')
  @response(200, {
    description: 'TestResult model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TestResult, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TestResult, {exclude: 'where'}) filter?: FilterExcludingWhere<TestResult>
  ): Promise<TestResult> {
    return this.testResultRepository.findById(id, filter);
  }

  @patch('/test-results/{id}')
  @response(204, {
    description: 'TestResult PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestResult, {partial: true}),
        },
      },
    })
    testResult: TestResult,
  ): Promise<void> {
    await this.testResultRepository.updateById(id, testResult);
  }

  @put('/test-results/{id}')
  @response(204, {
    description: 'TestResult PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() testResult: TestResult,
  ): Promise<void> {
    await this.testResultRepository.replaceById(id, testResult);
  }

  @del('/test-results/{id}')
  @response(204, {
    description: 'TestResult DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.testResultRepository.deleteById(id);
  }
}
