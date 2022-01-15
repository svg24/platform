import type { RegisterOptions } from 'fastify';
import type { Model, Schema as ModelSchema } from 'mongoose';
import type { RouteResponseDataItemContentItemSnippetsSVG } from './item';
import type { ConstructorInstance } from './server';

declare namespace List {
  interface Constructor {
    getDataItem(item: Schema): Promise<RouteResponseDataItem>;
    model: Model<Schema>;
    options: RegisterOptions;
    plugin(inst: ConstructorInstance): Promise<void>;
    schema: ModelSchema<Schema>;
  }
  type Schema = {
    category: SchemaCategory;
    company: SchemaCompany;
    date: string;
    id: SchemaId;
    name: SchemaName;
    src: string;
  };
  type SchemaId = string;
  type SchemaCategory = string;
  type SchemaCompany = string;
  type SchemaName = string;
  type RouteQuery = {
    category?: SchemaCategory;
    company?: SchemaCompany;
    multiplier?: number;
    name?: SchemaName;
    page?: number;
    sortBy?: 'date' | 'name';
  };
  type RouteResponse = {
    data: RouteResponseData;
    meta: RouteResponseMeta;
  };
  type RouteResponseData = RouteResponseDataItem[];
  type RouteResponseDataItem = {
    hasMore: RouteResponseDataItemHasMore;
    id: SchemaId;
    latest: RouteResponseDataItemLatest;
    name: SchemaName;
  };
  type RouteResponseDataItemHasMore = boolean;
  type RouteResponseDataItemLatest = RouteResponseDataItemContentItemSnippetsSVG;
  type RouteResponseMeta = {
    length: {
      current: RouteResponseMetaLengthCurrent;
      total: RouteResponseMetaLengthTotal;
    };
    multiplier?: RouteResponseMetaMultiplier;
    page: {
      hasNext: RouteResponseMetaPageHasNext;
      next: RouteResponseMetaPageNext;
    };
  };
  type RouteResponseMetaLengthCurrent = number;
  type RouteResponseMetaLengthTotal = number;
  type RouteResponseMetaMultiplier = number;
  type RouteResponseMetaPageHasNext = boolean;
  type RouteResponseMetaPageNext = number;
}

export = List;
