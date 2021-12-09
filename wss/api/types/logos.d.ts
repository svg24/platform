import type { Module } from 'types/module';

export interface Logos extends Module<LogosItem> {}

type LogosItem = {
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
