import type { RegisterOptions } from 'fastify';
import type { RouteResponseDataItemDataItemDataSnippetsSVG } from './item';
import type { SchemaId } from './list';
import type { ConstructorInstance } from './server';

declare namespace Content {
  interface Constructor {
    getContent(id: RouteParametersId, name: RouteParametersName): Promise<RouteResponseDataItemDataItemDataSnippetsSVG>;
    options: RegisterOptions;
    plugin(inst: ConstructorInstance): Promise<void>;
  }
  type RouteParameters = {
    id: RouteParametersId;
    name: RouteParametersName;
  };
  type RouteParametersId = SchemaId;
  type RouteParametersName = SchemaId;
}

export = Content;
