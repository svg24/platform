import type { Model, Schema } from 'mongoose';
import type { server } from '../../core';

export interface List {
  item: {
    readonly model: Model<ListItem>;
    schema: Schema<ListItem>;
  };
  opts: {
    prefix: string;
  };
  plugin: (inst: typeof server.inst) => Promise<void>;
}

export type ListItem = {
  category: string;
  company: string;
  date: string;
  id: string;
  name: string;
  src: string;
};

export type ListIndexQuery = {
  category?: string;
  company?: string;
  multiplier?: number;
  name?: string;
  page?: number;
  sortBy?: 'date' | 'name';
};
