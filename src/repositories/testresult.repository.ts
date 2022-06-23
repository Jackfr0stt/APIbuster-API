import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Testresult, TestresultRelations} from '../models';

export class TestresultRepository extends DefaultCrudRepository<
  Testresult,
  typeof Testresult.prototype.id,
  TestresultRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Testresult, dataSource);
  }
}
