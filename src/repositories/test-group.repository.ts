import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TestGroup, TestGroupRelations} from '../models';

export class TestGroupRepository extends DefaultCrudRepository<
  TestGroup,
  typeof TestGroup.prototype.id,
  TestGroupRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(TestGroup, dataSource);
  }
}
