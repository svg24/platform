import type { Model, Schema } from 'mongoose';
import type { server } from '../../core';

export interface Logos {
  model: Model<LogosItem>;
  opts: {
    prefix: string;
  };
  plugin: (inst: typeof server.inst) => Promise<void>;
  schema: Schema<LogosItem>;
}

export type LogosItem = {
  category: string;
  company: string;
  date: string;
  id: string;
  name: string;
  src: string;
};

export type LogosIndexQuery = {
  category?: string;
  company?: string;
  multiplier?: number;
  name?: string;
  page?: number;
  sortBy?: 'date' | 'name';
};
