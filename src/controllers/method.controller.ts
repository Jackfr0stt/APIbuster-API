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
import {Method} from '../models';
import {MethodRepository} from '../repositories';

export class MethodController {
  constructor(
    @repository(MethodRepository)
    public methodRepository : MethodRepository,
  ) {}

  @post('/methods')
  @response(200, {
    description: 'Method model instance',
    content: {'application/json': {schema: getModelSchemaRef(Method)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Method, {
            title: 'NewMethod',
            exclude: ['id'],
          }),
        },
      },
    })
    method: Omit<Method, 'id'>,
  ): Promise<Method> {
    return this.methodRepository.create(method);
  }

  @get('/methods/count')
  @response(200, {
    description: 'Method model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Method) where?: Where<Method>,
  ): Promise<Count> {
    return this.methodRepository.count(where);
  }

  @get('/methods')
  @response(200, {
    description: 'Array of Method model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Method, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Method) filter?: Filter<Method>,
  ): Promise<Method[]> {
    return this.methodRepository.find(filter);
  }

  @patch('/methods')
  @response(200, {
    description: 'Method PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Method, {partial: true}),
        },
      },
    })
    method: Method,
    @param.where(Method) where?: Where<Method>,
  ): Promise<Count> {
    return this.methodRepository.updateAll(method, where);
  }

  @get('/methods/{id}')
  @response(200, {
    description: 'Method model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Method, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Method, {exclude: 'where'}) filter?: FilterExcludingWhere<Method>
  ): Promise<Method> {
    return this.methodRepository.findById(id, filter);
  }

  @patch('/methods/{id}')
  @response(204, {
    description: 'Method PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Method, {partial: true}),
        },
      },
    })
    method: Method,
  ): Promise<void> {
    await this.methodRepository.updateById(id, method);
  }

  @put('/methods/{id}')
  @response(204, {
    description: 'Method PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() method: Method,
  ): Promise<void> {
    await this.methodRepository.replaceById(id, method);
  }

  @del('/methods/{id}')
  @response(204, {
    description: 'Method DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.methodRepository.deleteById(id);
  }
}
