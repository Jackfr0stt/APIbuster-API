import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Method} from '.';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'test_group'},
    foreignKeys: {
      fktestGroup961148Rel: {
        name: 'fktestGroup961148Rel',
        entity: 'Method',
        entityKey: 'id',
        foreignKey: 'methodid'
      }
    }
  }
})
export class TestGroup extends Entity {
  @property({
    type: 'number',
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id?: number;

  @belongsTo(() => Method)
  methodId: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'test_group_duration', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  testGroupDuration?: number;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'test_group_end', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  testGroupEnd?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'test_group_name', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  testGroupName?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'test_group_start', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  testGroupStart?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TestGroup>) {
    super(data);
  }
}

export interface TestGroupRelations {
  // describe navigational properties here
}

export type TestGroupWithRelations = TestGroup & TestGroupRelations;
