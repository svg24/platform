import type { RegisterOptions } from 'fastify';
import type { SchemaId } from './list';
import type { ConstructorInstance } from './server';

declare namespace Content {
  interface Constructor {
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
