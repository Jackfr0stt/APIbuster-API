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
import {Endpoint} from '../models';
import {EndpointRepository} from '../repositories';

export class EndpointController {
  constructor(
    @repository(EndpointRepository)
    public endpointRepository : EndpointRepository,
  ) {}

  @post('/endpoints')
  @response(200, {
    description: 'Endpoint model instance',
    content: {'application/json': {schema: getModelSchemaRef(Endpoint)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Endpoint, {
            title: 'NewEndpoint',
            exclude: ['id'],
          }),
        },
      },
    })
    endpoint: Omit<Endpoint, 'id'>,
  ): Promise<Endpoint> {
    return this.endpointRepository.create(endpoint);
  }

  @get('/endpoints/count')
  @response(200, {
    description: 'Endpoint model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Endpoint) where?: Where<Endpoint>,
  ): Promise<Count> {
    return this.endpointRepository.count(where);
  }

  @get('/endpoints')
  @response(200, {
    description: 'Array of Endpoint model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Endpoint, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Endpoint) filter?: Filter<Endpoint>,
  ): Promise<Endpoint[]> {
    return this.endpointRepository.find(filter);
  }

  @patch('/endpoints')
  @response(200, {
    description: 'Endpoint PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Endpoint, {partial: true}),
        },
      },
    })
    endpoint: Endpoint,
    @param.where(Endpoint) where?: Where<Endpoint>,
  ): Promise<Count> {
    return this.endpointRepository.updateAll(endpoint, where);
  }

  @get('/endpoints/{id}')
  @response(200, {
    description: 'Endpoint model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Endpoint, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Endpoint, {exclude: 'where'}) filter?: FilterExcludingWhere<Endpoint>
  ): Promise<Endpoint> {
    return this.endpointRepository.findById(id, filter);
  }

  @patch('/endpoints/{id}')
  @response(204, {
    description: 'Endpoint PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Endpoint, {partial: true}),
        },
      },
    })
    endpoint: Endpoint,
  ): Promise<void> {
    await this.endpointRepository.updateById(id, endpoint);
  }

  @put('/endpoints/{id}')
  @response(204, {
    description: 'Endpoint PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() endpoint: Endpoint,
  ): Promise<void> {
    await this.endpointRepository.replaceById(id, endpoint);
  }

  @del('/endpoints/{id}')
  @response(204, {
    description: 'Endpoint DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.endpointRepository.deleteById(id);
  }
}
