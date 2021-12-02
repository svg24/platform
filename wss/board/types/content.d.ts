import type {
  ApiLogosDataItem,
  ApiLogosMeta,
  ApiResultLogos,
} from 'types/api';
import type { Store, StoreVisible } from 'types/store';

export interface ContentStore extends Store<ContentStore> {
  bag: ContentStoreBag;
  list: ContentStoreList;
  meta: ContentStoreMeta;
  search: ContentStoreSearch;
  sentinel: StoreVisible;
}

/**
 * Bag
 */

type ContentStoreBag = {
  add: (item: ApiLogosDataItem) => void;
  clear: () => void;
  items: ApiResultLogos['data'] | undefined;
};

/**
 * List
 */

type ContentStoreList = {
  _items: ApiResultLogos['data'] | undefined;
  add: (data: ApiResultLogos['data']) => void;
  clear: () => void;
  fetch: (multiplier?: number) => Promise<ApiResultLogos>;
  isItems: boolean;
  items: ContentStoreList['_items'];
  reset: () => Promise<void>;
  upload: () => Promise<void>;
};

/**
 * Meta
 */

type ContentStoreMeta = {
  length: {
    _cur: number;
    _total: number;
    cur: ContentStoreMeta['length']['_cur'];
    setCur: (val: number) => void;
    setTotal: (val: number) => void;
    total: ContentStoreMeta['length']['_total'];
  };
  page: {
    _isNext: boolean;
    isNext: ContentStoreMeta['page']['_isNext'];
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

type ContentStoreSearch = {
  process: (val: string) => void;
  reset: () => void;
  val: {
    _field: string;
    _prev: string | undefined;
    cur: string | undefined;
    field: ContentStoreSearch['val']['_field'];
  };
};
