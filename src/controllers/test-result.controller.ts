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
import {Testresult} from '../models';
import {TestresultRepository} from '../repositories';

export class TestResultController {
  constructor(
    @repository(TestresultRepository)
    public testresultRepository : TestresultRepository,
  ) {}

  @post('/testresults')
  @response(200, {
    description: 'Testresult model instance',
    content: {'application/json': {schema: getModelSchemaRef(Testresult)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testresult, {
            title: 'NewTestresult',
            exclude: ['id'],
          }),
        },
      },
    })
    testresult: Omit<Testresult, 'id'>,
  ): Promise<Testresult> {
    return this.testresultRepository.create(testresult);
  }

  @get('/testresults/count')
  @response(200, {
    description: 'Testresult model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Testresult) where?: Where<Testresult>,
  ): Promise<Count> {
    return this.testresultRepository.count(where);
  }

  @get('/testresults')
  @response(200, {
    description: 'Array of Testresult model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Testresult, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Testresult) filter?: Filter<Testresult>,
  ): Promise<Testresult[]> {
    return this.testresultRepository.find(filter);
  }

  @patch('/testresults')
  @response(200, {
    description: 'Testresult PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testresult, {partial: true}),
        },
      },
    })
    testresult: Testresult,
    @param.where(Testresult) where?: Where<Testresult>,
  ): Promise<Count> {
    return this.testresultRepository.updateAll(testresult, where);
  }

  @get('/testresults/{id}')
  @response(200, {
    description: 'Testresult model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Testresult, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Testresult, {exclude: 'where'}) filter?: FilterExcludingWhere<Testresult>
  ): Promise<Testresult> {
    return this.testresultRepository.findById(id, filter);
  }

  @patch('/testresults/{id}')
  @response(204, {
    description: 'Testresult PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Testresult, {partial: true}),
        },
      },
    })
    testresult: Testresult,
  ): Promise<void> {
    await this.testresultRepository.updateById(id, testresult);
  }

  @put('/testresults/{id}')
  @response(204, {
    description: 'Testresult PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() testresult: Testresult,
  ): Promise<void> {
    await this.testresultRepository.replaceById(id, testresult);
  }

  @del('/testresults/{id}')
  @response(204, {
    description: 'Testresult DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.testresultRepository.deleteById(id);
  }
}
