import type { RegisterOptions } from 'fastify';
import type { Model, Schema as ModelSchema } from 'mongoose';
import type Server from 'types/server';

declare namespace Logos {
  const model: Model<Schema>;
  const opts: RegisterOptions;
  function plugin(inst: typeof Server.inst): Promise<void>;
  const schema: ModelSchema<Schema>;

  type Schema = {
    category: string;
    company: string;
    date: string;
    id: string;
    name: string;
    src: string;
  };

  type RouteQuery = {
    category?: string;
    company?: string;
    multiplier?: number;
    name?: string;
    page?: number;
    sortBy?: 'date' | 'name';
  };
}

export = Logos;
