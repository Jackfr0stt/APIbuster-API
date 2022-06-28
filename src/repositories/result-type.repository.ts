import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {ResultType, ResultTypeRelations} from '../models';

export class ResultTypeRepository extends DefaultCrudRepository<
  ResultType,
  typeof ResultType.prototype.id,
  ResultTypeRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(ResultType, dataSource);
  }
}
