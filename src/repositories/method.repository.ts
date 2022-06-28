import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Method, MethodRelations} from '../models';

export class MethodRepository extends DefaultCrudRepository<
  Method,
  typeof Method.prototype.id,
  MethodRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Method, dataSource);
  }
}
