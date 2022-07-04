import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ResultType, Test} from '.';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'test_result'},
    foreignKeys: {
      fktestResul170790Rel: {
        name: 'fktestResul170790Rel',
        entity: 'Test',
        entityKey: 'id',
        foreignKey: 'testid'
      },
      fktestResul888717Rel: {
        name: 'fktestResul888717Rel',
        entity: 'ResultType',
        entityKey: 'id',
        foreignKey: 'result_typeid'
      }
    }
  }
})
export class TestResult extends Entity {
  @property({
    type: 'number',
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id?: number;

  @belongsTo(() => ResultType)
  result_typeId: number;

  @belongsTo(() => Test)
  testId: number;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'result_date', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  resultDate?: string;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'result_duration', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  resultDuration?: number;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'result_error', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  resultError?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'result_speed', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  resultSpeed?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'result_title', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  resultTitle?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TestResult>) {
    super(data);
  }
}

export interface TestResultRelations {
  // describe navigational properties here
}

export type TestResultWithRelations = TestResult & TestResultRelations;
