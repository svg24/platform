import type { ListSchema } from 'types/list';
import type { Module } from 'types/module';

export interface Item {
  opts: Module<any>['opts'];
  plugin: Module<any>['plugin'];
}

export type ItemRouteQuery = {
  id: ListSchema['id'];
};

export type ItemData = ItemDataItem[];

export type ItemDataItem = {
  content: ItemDataItemContent;
  version: ItemDataItemVersion;
};

export type ItemDataItemContent = {
  components: {
    js: {
      react: string;
      vue: string;
    };
    ts: {
      react: string;
    };
  };
  links: {
    url: string;
  };
  packages: {
    react: string;
    vue: string;
  };
  snippets: {
    css: string;
    jsx: string;
    svg: string;
  };
};

export type ItemDataItemVersion = {
  date: number;
  type: 'squared';
};
