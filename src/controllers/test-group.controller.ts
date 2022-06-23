import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Testgroup} from '../models';
import {TestgroupRepository} from '../repositories';

export class TestGroupController {
  constructor(
    @repository(TestgroupRepository)
    public testgroupRepository : TestgroupRepository,
  ) {}

  @post('/testgroups')
  @response(200, {
    description: 'Testgroup model instance',
    content: {'application/json': {schema: getModelSchemaRef(Testgroup)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testgroup, {
            title: 'NewTestgroup',
            exclude: ['id'],
          }),
        },
      },
    })
    testgroup: Omit<Testgroup, 'id'>,
  ): Promise<Testgroup> {
    return this.testgroupRepository.create(testgroup);
  }

  @get('/testgroups/count')
  @response(200, {
    description: 'Testgroup model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Testgroup) where?: Where<Testgroup>,
  ): Promise<Count> {
    return this.testgroupRepository.count(where);
  }

  @get('/testgroups')
  @response(200, {
    description: 'Array of Testgroup model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Testgroup, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Testgroup) filter?: Filter<Testgroup>,
  ): Promise<Testgroup[]> {
    return this.testgroupRepository.find(filter);
  }

  @patch('/testgroups')
  @response(200, {
    description: 'Testgroup PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testgroup, {partial: true}),
        },
      },
    })
    testgroup: Testgroup,
    @param.where(Testgroup) where?: Where<Testgroup>,
  ): Promise<Count> {
    return this.testgroupRepository.updateAll(testgroup, where);
  }

  @get('/testgroups/{id}')
  @response(200, {
    description: 'Testgroup model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Testgroup, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Testgroup, {exclude: 'where'}) filter?: FilterExcludingWhere<Testgroup>
  ): Promise<Testgroup> {
    return this.testgroupRepository.findById(id, filter);
  }

  @patch('/testgroups/{id}')
  @response(204, {
    description: 'Testgroup PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testgroup, {partial: true}),
        },
      },
    })
    testgroup: Testgroup,
  ): Promise<void> {
    await this.testgroupRepository.updateById(id, testgroup);
  }

  @put('/testgroups/{id}')
  @response(204, {
    description: 'Testgroup PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() testgroup: Testgroup,
  ): Promise<void> {
    await this.testgroupRepository.replaceById(id, testgroup);
  }

  @del('/testgroups/{id}')
  @response(204, {
    description: 'Testgroup DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.testgroupRepository.deleteById(id);
  }
}
