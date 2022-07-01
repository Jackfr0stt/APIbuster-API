import {belongsTo, Entity, model, property} from '@loopback/repository';
import {TestGroup} from '.';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'test'},
    foreignKeys: {
      fktest204866Rel: {
        name: 'fktest204866Rel',
        entity: 'TestGroup',
        entityKey: 'id',
        foreignKey: 'test_groupid'
      }
    }
  }
})
export class Test extends Entity {
  @property({
    type: 'number',
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id?: number;

  @belongsTo(() => TestGroup)
  test_groupId: number;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'test_body', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  testBody?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'test_expect', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  testExpect?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'test_name', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  testName?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'test_type', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  testType?: string;

  @property({
    type: 'string',
    required: true,
    length: 255,
    postgresql: {columnName: 'discriminator', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'NO'},
  })
  discriminator: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Test>) {
    super(data);
  }
}

export interface TestRelations {
  // describe navigational properties here
}

export type TestWithRelations = Test & TestRelations;
