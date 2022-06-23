import { Entity, model, property, belongsTo } from '@loopback/repository';
import { Testtype, Test } from '.';

@model({
  settings: {
    idInjection: false,
    postgresql: { schema: 'public', table: 'testresult' },
    foreignKeys: {
      fktestresult80581Rel: {
        name: 'fktestresult80581Rel',
        entity: 'Testtype',
        entityKey: 'id',
        foreignKey: 'testtypeid'
      },
      fktestresult77289Rel: {
        name: 'fktestresult77289Rel',
        entity: 'Test',
        entityKey: 'id',
        foreignKey: 'testid'
      }
    }
  }
})
export class Testresult extends Entity {
  @property({
    type: 'number',
    scale: 0,
    id: 1,
    postgresql: { columnName: 'id', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'NO' },
  })
  id?: number;

  @belongsTo(() => Test)
  testid: number;

  @belongsTo(() => Testtype)
  testtypeid: number;

  @property({
    type: 'number',
    scale: 0,
    postgresql: { columnName: 'resultduration', dataType: 'integer', dataLength: null, dataPrecision: null, dataScale: 0, nullable: 'YES' },
  })
  resultduration?: number;

  @property({
    type: 'string',
    length: 255,
    postgresql: { columnName: 'resulterror', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  resulterror?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: { columnName: 'resultspeed', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  resultspeed?: string;

  @property({
    type: 'string',
    length: 255,
    postgresql: { columnName: 'resulttitle', dataType: 'character varying', dataLength: 255, dataPrecision: null, dataScale: null, nullable: 'YES' },
  })
  resulttitle?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Testresult>) {
    super(data);
  }
}

export interface TestresultRelations {
  // describe navigational properties here
}

export type TestresultWithRelations = Testresult & TestresultRelations;
