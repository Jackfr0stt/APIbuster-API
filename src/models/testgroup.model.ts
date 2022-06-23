import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Endpoint} from '.';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'testgroup'},
    foreignKeys: {
      fktestgroup878574Rel: {
        name: 'fktestgroup878574Rel',
        entity: 'Endpoint',
        entityKey: 'id',
        foreignKey: 'endpointid'
      }
    }
  }
})
export class Testgroup extends Entity {
  @property({
    type: 'number',
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id?: number;

  @belongsTo(() => Endpoint)
  endpointid: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: {columnName: 'testgroupduration', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES'},
  })
  testgroupduration?: number;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'testgroupend', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  testgroupend?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'testgroupname', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  testgroupname?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'testgroupstart', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  testgroupstart?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Testgroup>) {
    super(data);
  }
}

export interface TestgroupRelations {
  // describe navigational properties here
}

export type TestgroupWithRelations = Testgroup & TestgroupRelations;
