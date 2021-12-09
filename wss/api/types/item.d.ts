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

type ItemDataItem = {
  content: ItemDataItemContent;
  file: ItemDataItemFile;
  version: ItemDataItemVersion;
};

type ItemDataItemContentTypes = 'square' | 'original';

type ItemDataItemContent = {
  [key in ItemDataItemContentTypes]?: ItemDataItemContentType;
};

type ItemDataItemContentType = {
  components: {
    react: {
      js: string;
      ts: string;
    };
    vue: {
      js: string;
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

type ItemDataItemFile = {
  camel: string;
  snake: string;
};

type ItemDataItemVersion = number;
