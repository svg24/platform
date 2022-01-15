import type { RegisterOptions } from 'fastify';
import type { Model, Schema as ModelSchema } from 'mongoose';
import type { ConstructorInstance } from './server';

declare namespace Simple {
  interface Constructor {
    find(filter: any): Promise<Schema>;
    model: Model<Schema>;
    options: RegisterOptions;
    plugin(inst: ConstructorInstance): Promise<void>;
    schema: ModelSchema<Schema>;
  }
  type Schema = {
    id: string;
    name: string;
  };
  type RouteResponse = {
    data: RouteResponseData;
    meta: any;
  };
  type RouteResponseData = {
    [key: string]: RouteResponseDataPropertyItem[];
  };
  type RouteResponseDataPropertyItem = Schema;
}

export = Simple;
