import type { RefObject } from 'react';
import type { LogosDataItem, LogosMeta, LogosResult } from 'src/plugins/api';
import type { Store } from 'src/types/store';

export interface LogosStore extends Store<LogosStore> {
  bag: LogosStoreBag;
  filter: LogosStoreFilter;
  list: LogosStoreList;
  meta: LogosStoreMeta;
  sentinel: LogosStoreSentinel;
}

/**
 * Bag
 */

type LogosStoreBag = {
  add: (item: LogosDataItem) => void;
  clear: () => void;
  items: LogosResult['data'] | undefined;
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
  multiplier: number;
  search: LogosFilterSearch;
  size: LogosFilterSelect;
  sortBy: LogosFilterSelect;
};

type LogosFilterSearch = {
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
 * List
 */

type LogosStoreList = {
  _items: LogosResult['data'] | undefined;
  add: (data: LogosResult['data']) => void;
  clear: () => void;
  fetch: (multiplier?: number) => Promise<LogosResult>;
  isItems: boolean;
  items: LogosStoreList['_items'];
  reset: () => Promise<void>;
  upload: () => Promise<void>;
};

/**
 * Meta
 */

type LogosStoreMeta = {
  length: {
    _cur: number;
    _total: number;
    cur: LogosStoreMeta['length']['_cur'];
    setCur: (val: number) => void;
    setTotal: (val: number) => void;
    total: LogosStoreMeta['length']['_total'];
  };
  page: {
    _isNext: boolean;
    isNext: LogosStoreMeta['page']['_isNext'];
    next: number;
    reset: () => void;
    setIsNext: (val: boolean) => void;
    setNext: (val: number) => void;
  };
  update: (val: LogosMeta) => void;
};

/**
 * Sentinel
 */

type LogosStoreSentinel = {
  hide: () => void;
  ref: RefObject<HTMLDivElement> | undefined;
  show: () => void;
};
