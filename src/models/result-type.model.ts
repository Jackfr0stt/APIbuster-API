import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, postgresql: {schema: 'public', table: 'result_type'}}
})
export class ResultType extends Entity {
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
    postgresql: {columnName: 'type_name', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES'},
  })
  typeName?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ResultType>) {
    super(data);
  }
}

export interface ResultTypeRelations {
  // describe navigational properties here
}

export type ResultTypeWithRelations = ResultType & ResultTypeRelations;
