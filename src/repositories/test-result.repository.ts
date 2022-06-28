import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {TestResult, TestResultRelations} from '../models';

export class TestResultRepository extends DefaultCrudRepository<
  TestResult,
  typeof TestResult.prototype.id,
  TestResultRelations
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(TestResult, dataSource);
  }
}
