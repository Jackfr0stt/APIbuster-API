import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Testgroup} from '.';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'test'},
    foreignKeys: {
      fktest34176Rel: {
        name: 'fktest34176Rel',
        entity: 'Testgroup',
        entityKey: 'id',
        foreignKey: 'testgroupid'
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

  @belongsTo(() => Testgroup)
  testgroupid: number;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'testbody', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  testbody?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'testexpect', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  testexpect?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'testname', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  testname?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'testtype', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  testtype?: string;

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
