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
import {Testtype} from '../models';
import {TesttypeRepository} from '../repositories';

export class TestTypeController {
  constructor(
    @repository(TesttypeRepository)
    public testtypeRepository : TesttypeRepository,
  ) {}

  @post('/testtypes')
  @response(200, {
    description: 'Testtype model instance',
    content: {'application/json': {schema: getModelSchemaRef(Testtype)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testtype, {
            title: 'NewTesttype',
            exclude: ['id'],
          }),
        },
      },
    })
    testtype: Omit<Testtype, 'id'>,
  ): Promise<Testtype> {
    return this.testtypeRepository.create(testtype);
  }

  @get('/testtypes/count')
  @response(200, {
    description: 'Testtype model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Testtype) where?: Where<Testtype>,
  ): Promise<Count> {
    return this.testtypeRepository.count(where);
  }

  @get('/testtypes')
  @response(200, {
    description: 'Array of Testtype model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Testtype, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Testtype) filter?: Filter<Testtype>,
  ): Promise<Testtype[]> {
    return this.testtypeRepository.find(filter);
  }

  @patch('/testtypes')
  @response(200, {
    description: 'Testtype PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testtype, {partial: true}),
        },
      },
    })
    testtype: Testtype,
    @param.where(Testtype) where?: Where<Testtype>,
  ): Promise<Count> {
    return this.testtypeRepository.updateAll(testtype, where);
  }

  @get('/testtypes/{id}')
  @response(200, {
    description: 'Testtype model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Testtype, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Testtype, {exclude: 'where'}) filter?: FilterExcludingWhere<Testtype>
  ): Promise<Testtype> {
    return this.testtypeRepository.findById(id, filter);
  }

  @patch('/testtypes/{id}')
  @response(204, {
    description: 'Testtype PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testtype, {partial: true}),
        },
      },
    })
    testtype: Testtype,
  ): Promise<void> {
    await this.testtypeRepository.updateById(id, testtype);
  }

  @put('/testtypes/{id}')
  @response(204, {
    description: 'Testtype PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() testtype: Testtype,
  ): Promise<void> {
    await this.testtypeRepository.replaceById(id, testtype);
  }

  @del('/testtypes/{id}')
  @response(204, {
    description: 'Testtype DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.testtypeRepository.deleteById(id);
  }
}
