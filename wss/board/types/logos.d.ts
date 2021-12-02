import type {
  ApiLogosDataItem,
  ApiLogosMeta,
  ApiResultLogos,
} from 'types/api';
import type { Store, StoreVisible } from 'types/store';

export interface LogosStore extends Store<LogosStore> {
  bag: LogosStoreBag;
  list: LogosStoreList;
  meta: LogosStoreMeta;
  search: LogosStoreSearch;
  sentinel: StoreVisible;
}

/**
 * Bag
 */

type LogosStoreBag = {
  add: (item: ApiLogosDataItem) => void;
  clear: () => void;
  items: ApiResultLogos['data'] | undefined;
};

/**
 * List
 */

type LogosStoreList = {
  _items: ApiResultLogos['data'] | undefined;
  add: (data: ApiResultLogos['data']) => void;
  clear: () => void;
  fetch: (multiplier?: number) => Promise<ApiResultLogos>;
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
  update: (val: ApiLogosMeta) => void;
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
