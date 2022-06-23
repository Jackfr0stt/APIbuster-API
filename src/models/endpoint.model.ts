import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Api} from '.';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'endpoint'},
    foreignKeys: {
      fkendpoint300459Rel: {
        name: 'fkendpoint300459Rel',
        entity: 'Api',
        entityKey: 'id',
        foreignKey: 'apiid'
      }
    }
  }
})
export class Endpoint extends Entity {
  @property({
    type: 'number',
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id?: number;

  @belongsTo(() => Api)
  apiid: number;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'body', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  body?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'endpointtype', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  endpointtype?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'header', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  header?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'method', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  method?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'route', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  route?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Endpoint>) {
    super(data);
  }
}

export interface EndpointRelations {
  // describe navigational properties here
}

export type EndpointWithRelations = Endpoint & EndpointRelations;
