import type { RefObject } from 'react';
import type {
  LogosDataItem,
  LogosMeta,
  LogosResult,
  SimpleResult,
} from 'src/plugins/api';
import type { Store } from 'types/store';

export interface LogosStore extends Store<LogosStore> {
  bag: LogosStoreBag;
  filter: LogosStoreFilter;
  list: LogosStoreList;
  meta: LogosStoreMeta;
  search: LogosStoreSearch;
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
  categories: LogosStoreFilterSimpleParameter;
  companies: LogosStoreFilterSimpleParameter;
  mount: () => Promise<void>;
  multiplier: number | undefined;
  reset: () => void;
  sortBy: LogosStoreFilterSortBy;
};

type LogosStoreFilterSimpleParameter = {
  fetch: () => Promise<void>;
  id: string;
  readonly isActive: boolean;
  legend: string;
  opts: SimpleResult['data'] | undefined;
  reset: () => void;
  set: (id: string) => void;
  val: {
    _cur: string | LogosStoreFilterSimpleParameter['val']['_def'];
    _def: undefined;
    cur: LogosStoreFilterSimpleParameter['val']['_cur'];
  };
};

type LogosStoreFilterSortBy = {
  id: string;
  readonly isActive: boolean;
  legend: string;
  opts: {
    id: string;
    name: string;
  }[];
  reset: () => void;
  set: (id: LogosStoreFilterSortBy['val']['cur']) => void;
  val: {
    _cur: LogosStoreFilterSortBy['val']['_def'];
    _def: LogosStoreFilterSortBy['opts'][0]['id'];
    cur: LogosStoreFilterSortBy['val']['_cur'];
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
 * Search
 */

type LogosStoreSearch = {
  process: (val: string) => void;
  reset: () => void;
  val: {
    _field: string;
    _prev: string | undefined;
    cur: string | undefined;
    field: LogosStoreSearch['val']['_field'];
  };
};

/**
 * Sentinel
 */

type LogosStoreSentinel = {
  hide: () => void;
  ref: RefObject<HTMLDivElement> | undefined;
  show: () => void;
};
