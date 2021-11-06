import type { Store } from './store';

export type LogosFilterPageOptions = {
  def: number;
  id: string;
};

export type LogosFilterPage = {
  id: string;
  next: () => void;
  reset: () => void;
  val: {
    _def: number;
    cur: number;
  };
};

export type LogosFilterSearchOptions = {
  id: string;
};

export type LogosFilterSearch = {
  id: string;
  isActive: boolean;
  process: (val: string) => void;
  reset: () => void;
  val: {
    _field: string | undefined;
    _prev: string | undefined;
    cur: string | undefined;
    field: LogosFilterSearch['val']['_field'];
  };
};

export type LogosFilterSelectOptions = {
  def: string;
  id: string;
  name: string;
  opts: {
    name: string;
    val: string;
  }[];
};

export type LogosFilterSelect = {
  id: string;
  isActive: boolean;
  name: string;
  onChange: (val: string) => void;
  opts: {
    name: string;
    val: string;
  }[];
  reset: () => void;
  val: {
    _cur: string;
    _def: string;
    cur: LogosFilterSelect['val']['_cur'];
  };
};

export type LogosFilterParameters = {
  page: LogosFilterPage;
  search: LogosFilterSearch;
  size: LogosFilterSelect;
  sortBy: LogosFilterSelect;
};

export type LogosStoreFilter = {
  isActive: boolean;
  params: LogosFilterParameters;
  reset: () => void;
};

export type LogosItem = {
  category: string;
  content: string[];
  date: string;
  name: string;
  slug: string;
  src: string;
};

export type LogosListResult = {
  data: LogosItem[];
  isMore: boolean;
};

export type LogosStoreList = {
  _isMore: boolean;
  _items: LogosListResult['data'] | undefined;
  add: (data: LogosListResult['data']) => void;
  clear: () => void;
  fetch: () => Promise<LogosListResult>;
  isItems: boolean;
  isMore: LogosStoreList['_isMore'];
  items: LogosStoreList['_items'];
  reset: () => Promise<void>;
  upload: () => Promise<void>;
};

export interface LogosStore extends Store<LogosStore> {
  filter: LogosStoreFilter;
  list: LogosStoreList;
}
