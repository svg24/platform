import type { RegisterOptions } from 'fastify';
import type { Model, Schema } from 'mongoose';
import type { server } from '../src/core';

export interface Module<T> {
  model: Model<T>;
  opts: RegisterOptions;
  plugin: (inst: typeof server.inst) => Promise<void>;
  schema: Schema<T>;
}
