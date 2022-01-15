import type { RegisterOptions } from 'fastify';
import type { SchemaId, SchemaName } from './list';
import type { ConstructorInstance } from './server';
import type { Schema } from './simple';

declare namespace Item {
  interface Constructor {
    getData(id: RouteQueryId): Promise<RouteResponseData>;
    getDataItem(id: RouteQueryId, name: string): Promise<RouteResponseDataItem>;
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
    content: RouteResponseDataItemContent;
    file: RouteResponseDataItemFile;
    version: RouteResponseDataItemVersion;
  };
  type RouteResponseDataItemContent = {
    [key in RouteResponseDataItemContentTypes]?: RouteResponseDataItemContentItem;
  };
  type RouteResponseDataItemContentTypes = 'original' | 'square';
  type RouteResponseDataItemContentItem = {
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
      svg: RouteResponseDataItemContentItemSnippetsSVG;
    };
  };
  type RouteResponseDataItemContentItemSnippetsSVG = string;
  type RouteResponseDataItemFile = {
    camel: string;
    snake: string;
  };
  type RouteResponseDataItemVersion = number;
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
