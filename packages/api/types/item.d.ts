import type { RegisterOptions } from 'fastify';
import type { SchemaId, SchemaName } from './list';
import type { ConstructorInstance } from './server';
import type { Schema } from './simple';

declare namespace Item {
  interface Constructor {
    getData(id: RouteQueryId): Promise<RouteResponseData>;
    options: RegisterOptions;
    plugin(inst: ConstructorInstance): Promise<void>;
  }
  type RouteQuery = {
    id: RouteQueryId;
  };
  type RouteQueryId = SchemaId;
  type RouteResponse = {
    data: RouteResponseData;
    meta: RouteResponseMeta;
  };
  type RouteResponseData = RouteResponseDataItem[];
  type RouteResponseDataItem = {
    data: RouteResponseDataItemData;
    meta: {
      version: RouteResponseDataItemMetaVersion;
    };
  };
  type RouteResponseDataItemData = {
    [key in RouteResponseDataItemDataTypes]?: RouteResponseDataItemDataItem;
  };
  type RouteResponseDataItemDataTypes = 'original' | 'square';
  type RouteResponseDataItemDataItem = {
    data: RouteResponseDataItemDataItemData;
    meta: {
      componentName: string;
      fileName: string;
    };
  };
  type RouteResponseDataItemDataItemData = {
    api: {
      content: string;
    };
    components: {
      react: {
        js: string;
        ts: string;
      };
      vue: {
        js: string;
        ts: string;
      };
    };
    snippets: {
      css: string;
      jsx: string;
      svg: RouteResponseDataItemDataItemDataSnippetsSVG;
    };
  };
  type RouteResponseDataItemDataItemDataSnippetsSVG = string;
  type RouteResponseDataItemMetaVersion = number;
  // type RouteResponseDataItemContent = {
  //   [key in RouteResponseDataItemContentTypes]?: RouteResponseDataItemContentItem;
  // };
  // type RouteResponseDataItemContentTypes = 'original' | 'square';
  type RouteResponseMeta = {
    category: RouteResponseMetaCategory;
    company: RouteResponseMetaCompany;
    id: RouteResponseMetaId;
    name: RouteResponseMetaName;
    src: {
      product: string;
      usage: string;
    };
  };
  type RouteResponseMetaCategory = Schema;
  type RouteResponseMetaCompany = Schema;
  type RouteResponseMetaId = SchemaId;
  type RouteResponseMetaName = SchemaName;
}

export = Item;
