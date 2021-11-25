import type { Model, Schema } from 'mongoose';
import type { server } from '../core';

export interface Module<T> {
  model: Model<T>;
  opts: {
    prefix: string;
  };
  plugin: (inst: typeof server.inst) => Promise<void>;
  schema: Schema<T>;
}

export type ModuleSimpleItem = {
  id: string;
  name: string;
};
