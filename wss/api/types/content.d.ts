import type { ListSchema } from 'types/list';
import type { Module } from 'types/module';

export interface Content {
  opts: Module<any>['opts'];
  plugin: Module<any>['plugin'];
}

export type ContentRouteParameters = {
  id: ListSchema['id'];
  name: ListSchema['id'];
};
