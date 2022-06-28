import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, postgresql: {schema: 'public', table: 'api'}}})
export class Api extends Entity {
  @property({
    type: 'number',
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id?: number;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'api_domain', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  apiDomain?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'api_name', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  apiName?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'api_type', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  apiType?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Api>) {
    super(data);
  }
}

export interface ApiRelations {
  // describe navigational properties here
}

export type ApiWithRelations = Api & ApiRelations;
