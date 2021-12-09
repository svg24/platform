import type { ItemDataItemContentType } from 'types/item';
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

type ListDataItem = {
  isMany: ListDataItemIsMany;
  latest: ListDataItemLatest;
};

type ListDataItemIsMany = boolean;

type ListDataItemLatest = ItemDataItemContentType['snippets']['svg'];
