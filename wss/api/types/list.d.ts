import type { RegisterOptions } from 'fastify';
import type { Model, Schema as ModelSchema } from 'mongoose';
import type { RouteResponseDataItemContentItemSnippetsSVG } from 'types/item';
import type Server from 'types/server';

declare namespace List {
  const model: Model<Schema>;
  const options: RegisterOptions;
  function plugin(inst: typeof Server.inst): Promise<void>;
  const schema: ModelSchema<Schema>;

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
  };
  type RouteResponseData = RouteResponseDataItem[];
  type RouteResponseDataItem = {
    hasMore: RouteResponseDataItemHasMore;
    latest: RouteResponseDataItemLatest;
  };
  type RouteResponseDataItemHasMore = boolean;
  type RouteResponseDataItemLatest
    = RouteResponseDataItemContentItemSnippetsSVG;

  function getDataItem(id: SchemaId): Promise<RouteResponseDataItem>;
  function getDataItemHasMore(id: SchemaId): Promise<RouteResponseDataItemHasMore>;
  function getDataItemLatest(id: SchemaId): Promise<RouteResponseDataItemLatest>;
}

export = List;
