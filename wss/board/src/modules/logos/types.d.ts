import type { RefObject } from 'react';
import type { LogosDataItem, LogosResult } from 'src/plugins/api';
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
  _items: LogosResult['data'] | undefined;
  add: (data: LogosResult['data']) => void;
  clear: () => void;
  fetch: (multiplier?: number) => Promise<LogosResult>;
  isItems: boolean;
  isMore: LogosStoreList['_isMore'];
  items: LogosStoreList['_items'];
  reset: () => Promise<void>;
  updateIsMore: (val: LogosStoreList['_isMore']) => void;
  upload: () => Promise<void>;
};

/**
 * Sentinel
 */

type LogosStoreSentinel = {
  hide: () => void;
  ref: RefObject<HTMLDivElement> | undefined;
  show: () => void;
};
