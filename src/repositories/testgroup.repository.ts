import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Testgroup, TestgroupRelations} from '../models';

export class TestgroupRepository extends DefaultCrudRepository<
  Testgroup,
  typeof Testgroup.prototype.id,
  TestgroupRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Testgroup, dataSource);
  }
}
