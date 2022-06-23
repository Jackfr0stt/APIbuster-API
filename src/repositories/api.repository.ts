import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { PostgresDataSource } from '../datasources';
import { Api, ApiRelations } from '../models';

export class ApiRepository extends DefaultCrudRepository<
  Api,
  typeof Api.prototype.id,
  ApiRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Api, dataSource);
  }
}
