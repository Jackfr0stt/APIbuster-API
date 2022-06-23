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
import {Api} from '../models';
import {ApiRepository} from '../repositories';

export class ApiController {
  constructor(
    @repository(ApiRepository)
    public apiRepository : ApiRepository,
  ) {}

  @post('/apis')
  @response(200, {
    description: 'Api model instance',
    content: {'application/json': {schema: getModelSchemaRef(Api)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Api, {
            title: 'NewApi',
            exclude: ['id'],
          }),
        },
      },
    })
    api: Omit<Api, 'id'>,
  ): Promise<Api> {
    return this.apiRepository.create(api);
  }

  @get('/apis/count')
  @response(200, {
    description: 'Api model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Api) where?: Where<Api>,
  ): Promise<Count> {
    return this.apiRepository.count(where);
  }

  @get('/apis')
  @response(200, {
    description: 'Array of Api model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Api, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Api) filter?: Filter<Api>,
  ): Promise<Api[]> {
    return this.apiRepository.find(filter);
  }

  @patch('/apis')
  @response(200, {
    description: 'Api PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Api, {partial: true}),
        },
      },
    })
    api: Api,
    @param.where(Api) where?: Where<Api>,
  ): Promise<Count> {
    return this.apiRepository.updateAll(api, where);
  }

  @get('/apis/{id}')
  @response(200, {
    description: 'Api model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Api, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Api, {exclude: 'where'}) filter?: FilterExcludingWhere<Api>
  ): Promise<Api> {
    return this.apiRepository.findById(id, filter);
  }

  @patch('/apis/{id}')
  @response(204, {
    description: 'Api PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Api, {partial: true}),
        },
      },
    })
    api: Api,
  ): Promise<void> {
    await this.apiRepository.updateById(id, api);
  }

  @put('/apis/{id}')
  @response(204, {
    description: 'Api PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() api: Api,
  ): Promise<void> {
    await this.apiRepository.replaceById(id, api);
  }

  @del('/apis/{id}')
  @response(204, {
    description: 'Api DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.apiRepository.deleteById(id);
  }
}
