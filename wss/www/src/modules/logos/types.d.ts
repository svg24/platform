import type { RefObject } from 'react';
import type { Store } from 'src/types/store';

export interface LogosStore extends Store<LogosStore> {
  bag: LogosStoreBag;
  filter: LogosStoreFilter;
  info: LogosStoreInfo;
  list: LogosStoreList;
  sentinel: LogosStoreSentinel;
}

/**
 * Bag
 */

type LogosStoreBag = {
  add: (item: LogosItem) => void;
  clear: () => void;
  items: LogosItem[] | undefined;
};

/**
 * Filter
 */

type LogosStoreFilter = {
  isActive: boolean;
  params: LogosFilterParameters;
  reset: () => void;
};

export type LogosFilterParameters = {
  initPage: number;
  page: LogosFilterPage;
  search: LogosFilterSearch;
  size: LogosFilterSelect;
  sortBy: LogosFilterSelect;
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

type LogosFilterSearch = {
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

/**
 * Info
 */

type LogosStoreInfo = {
  _total: number;
  fetch: () => Promise<void>;
  total: LogosStoreInfo['_total'];
};

/**
 * List
 */

type LogosStoreList = {
  _isMore: boolean;
  _items: LogosListResult['data'] | undefined;
  add: (data: LogosListResult['data']) => void;
  clear: () => void;
  fetch: (multiplier?: number) => Promise<LogosListResult>;
  isItems: boolean;
  isMore: LogosStoreList['_isMore'];
  items: LogosStoreList['_items'];
  reset: () => Promise<void>;
  updateIsMore: (val: LogosStoreList['_isMore']) => void;
  upload: () => Promise<void>;
};

export type LogosListResult = {
  data: LogosItem[];
  isMore: boolean;
};

export type LogosItem = {
  category: string;
  content: string[];
  date: string;
  name: string;
  slug: string;
  src: string;
};

/**
 * Sentinel
 */

type LogosStoreSentinel = {
  hide: () => void;
  ref: RefObject<HTMLDivElement> | undefined;
  show: () => void;
};
