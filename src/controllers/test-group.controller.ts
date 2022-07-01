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
import {TestGroup} from '../models';
import {TestGroupRepository} from '../repositories';

export class TestGroupController {
  constructor(
    @repository(TestGroupRepository)
    public testGroupRepository: TestGroupRepository,
  ) { }

  @post('/test-groups')
  @response(200, {
    description: 'TestGroup model instance',
    content: {'application/json': {schema: getModelSchemaRef(TestGroup)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestGroup, {
            title: 'NewTestGroup',
            exclude: ['id'],
          }),
        },
      },
    })
    testGroup: Omit<TestGroup, 'id'>,
  ): Promise<TestGroup> {
    return this.testGroupRepository.create(testGroup);
  }

  @get('/test-groups/count')
  @response(200, {
    description: 'TestGroup model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TestGroup) where?: Where<TestGroup>,
  ): Promise<Count> {
    return this.testGroupRepository.count(where);
  }

  @get('/test-groups')
  @response(200, {
    description: 'Array of TestGroup model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TestGroup, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.where(TestGroup) where?: Where<TestGroup>,
  ): Promise<TestGroup[]> {
    let whereFilter: any = where;
    return this.testGroupRepository.find(whereFilter);
  }

  @patch('/test-groups')
  @response(200, {
    description: 'TestGroup PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestGroup, {partial: true}),
        },
      },
    })
    testGroup: TestGroup,
    @param.where(TestGroup) where?: Where<TestGroup>,
  ): Promise<Count> {
    return this.testGroupRepository.updateAll(testGroup, where);
  }

  @get('/test-groups/{id}')
  @response(200, {
    description: 'TestGroup model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TestGroup, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TestGroup, {exclude: 'where'}) filter?: FilterExcludingWhere<TestGroup>
  ): Promise<TestGroup> {
    return this.testGroupRepository.findById(id, filter);
  }

  @patch('/test-groups/{id}')
  @response(204, {
    description: 'TestGroup PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TestGroup, {partial: true}),
        },
      },
    })
    testGroup: TestGroup,
  ): Promise<void> {
    await this.testGroupRepository.updateById(id, testGroup);
  }

  @put('/test-groups/{id}')
  @response(204, {
    description: 'TestGroup PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() testGroup: TestGroup,
  ): Promise<void> {
    await this.testGroupRepository.replaceById(id, testGroup);
  }

  @del('/test-groups/{id}')
  @response(204, {
    description: 'TestGroup DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.testGroupRepository.deleteById(id);
  }
}
