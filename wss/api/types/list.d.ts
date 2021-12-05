import type { ItemDataItemContent } from 'types/item';
import type { Module } from 'types/module';

export interface List extends Module<ListSchema> {}

export type ListSchema = {
  category: string;
  company: string;
  date: string;
  id: string;
  name: string;
  src: string;
};

export type ListRouteQuery = {
  category?: ListSchema['category'];
  company?: ListSchema['company'];
  multiplier?: number;
  name?: ListSchema['name'];
  page?: number;
  sortBy?: 'date' | 'name';
};

export type ListDataItem = {
  isMany: ListDataItemIsMany;
  latest: ListDataItemLatest;
};

export type ListDataItemIsMany = boolean;

export type ListDataItemLatest = ItemDataItemContent['snippets']['svg'];
