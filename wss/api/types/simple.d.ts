import type { RegisterOptions } from 'fastify';
import type { Model, Schema as ModelSchema } from 'mongoose';
import type Server from 'types/server';

declare namespace Simple {
  const model: Model<Schema>;
  const options: RegisterOptions;
  function plugin(inst: typeof Server.inst): Promise<void>;
  const schema: ModelSchema<Schema>;

  type Schema = {
    id: string;
    name: string;
  };

  type RouteResponseData = Schema[];
}

export = Simple;
