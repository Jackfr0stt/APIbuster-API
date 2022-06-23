import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Testtype, TesttypeRelations} from '../models';

export class TesttypeRepository extends DefaultCrudRepository<
  Testtype,
  typeof Testtype.prototype.id,
  TesttypeRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Testtype, dataSource);
  }
}
