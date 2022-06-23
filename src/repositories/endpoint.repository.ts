import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Endpoint, EndpointRelations} from '../models';

export class EndpointRepository extends DefaultCrudRepository<
  Endpoint,
  typeof Endpoint.prototype.id,
  EndpointRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Endpoint, dataSource);
  }
}
