import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Api} from '.';

@model({
  settings: {
    idInjection: false,
    postgresql: {schema: 'public', table: 'method'},
    foreignKeys: {
      fkmethod137760Rel: {name: 'fkmethod137760Rel', entity: 'Api', entityKey: 'id', foreignKey: 'apiid'}
    }
  }
})
export class Method extends Entity {
  @property({
    type: 'number',
    scale: 0,
    id: 1,
    postgresql: {columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO'},
  })
  id?: number;

  @belongsTo(() => Api)
  apiId: number;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'method_body', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  methodBody?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'method_header', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  methodHeader?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'method_name', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  methodName?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'method_route', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  methodRoute?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: {columnName: 'method_type', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  methodType?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Method>) {
    super(data);
  }
}

export interface MethodRelations {
  // describe navigational properties here
}

export type MethodWithRelations = Method & MethodRelations;
