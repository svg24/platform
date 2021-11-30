import type { RefObject } from 'react';
import type {
  LogosDataItem,
  LogosMeta,
  LogosResult,
  SimpleResult,
} from 'src/plugins/api';
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
  readonly isActive: boolean;
  isMounted: boolean;
  mount: () => Promise<void>;
  params: LogosFilterParameters;
  reset: () => void;
};

type LogosFilterParameters = {
  categories: LogosFilterSimpleParameter;
  companies: LogosFilterSimpleParameter;
  multiplier: number | undefined;
  search: LogosFilterSearch;
  sortBy: LogosFilterSortBy;
};

type LogosFilterSimpleParameter = {
  fetch: () => Promise<void>;
  id: string;
  readonly isActive: boolean;
  legend: string;
  opts: SimpleResult['data'] | undefined;
  reset: () => void;
  set: (id: string) => void;
  val: {
    _cur: string | undefined;
    cur: LogosFilterSimpleParameter['val']['_cur'];
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

type LogosFilterSortBy = {
  id: string;
  readonly isActive: boolean;
  legend: string;
  opts: {
    id: string;
    name: string;
  }[];
  reset: () => void;
  set: (id: LogosFilterSortBy['val']['cur']) => void;
  val: {
    _cur: LogosFilterSortBy['val']['def'];
    cur: LogosFilterSortBy['val']['_cur'];
    def: LogosFilterSortBy['opts'][0]['id'];
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
