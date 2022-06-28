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
import {ResultType} from '../models';
import {ResultTypeRepository} from '../repositories';

export class ResultTypeController {
  constructor(
    @repository(ResultTypeRepository)
    public resultTypeRepository : ResultTypeRepository,
  ) {}

  @post('/result-types')
  @response(200, {
    description: 'ResultType model instance',
    content: {'application/json': {schema: getModelSchemaRef(ResultType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultType, {
            title: 'NewResultType',
            exclude: ['id'],
          }),
        },
      },
    })
    resultType: Omit<ResultType, 'id'>,
  ): Promise<ResultType> {
    return this.resultTypeRepository.create(resultType);
  }

  @get('/result-types/count')
  @response(200, {
    description: 'ResultType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ResultType) where?: Where<ResultType>,
  ): Promise<Count> {
    return this.resultTypeRepository.count(where);
  }

  @get('/result-types')
  @response(200, {
    description: 'Array of ResultType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ResultType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ResultType) filter?: Filter<ResultType>,
  ): Promise<ResultType[]> {
    return this.resultTypeRepository.find(filter);
  }

  @patch('/result-types')
  @response(200, {
    description: 'ResultType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultType, {partial: true}),
        },
      },
    })
    resultType: ResultType,
    @param.where(ResultType) where?: Where<ResultType>,
  ): Promise<Count> {
    return this.resultTypeRepository.updateAll(resultType, where);
  }

  @get('/result-types/{id}')
  @response(200, {
    description: 'ResultType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ResultType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ResultType, {exclude: 'where'}) filter?: FilterExcludingWhere<ResultType>
  ): Promise<ResultType> {
    return this.resultTypeRepository.findById(id, filter);
  }

  @patch('/result-types/{id}')
  @response(204, {
    description: 'ResultType PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultType, {partial: true}),
        },
      },
    })
    resultType: ResultType,
  ): Promise<void> {
    await this.resultTypeRepository.updateById(id, resultType);
  }

  @put('/result-types/{id}')
  @response(204, {
    description: 'ResultType PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resultType: ResultType,
  ): Promise<void> {
    await this.resultTypeRepository.replaceById(id, resultType);
  }

  @del('/result-types/{id}')
  @response(204, {
    description: 'ResultType DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resultTypeRepository.deleteById(id);
  }
}
