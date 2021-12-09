import type {
  ApiItem,
  ApiList,
  ApiListData,
  ApiListMeta,
} from 'types/api';
import type { Store, StoreVisible } from 'types/store';

export interface ContentStore extends Store<ContentStore> {
  item: ContentStoreItem;
  list: ContentStoreList;
  sentinel: StoreVisible;
}

type ContentStoreItem = {
  clear: () => void;
  fetch: () => Promise<void>;
  result: ApiItem | null;
};

type ContentStoreList = {
  fetch: (multiplier?: number) => Promise<ApiList>;
  reset: () => Promise<void>;
  result: ContentStoreListResult;
  upload: () => Promise<void>;
};

type ContentStoreListResultDataItems = ApiListData | [];
type ContentStoreListResultMetaLengthCurrent = ApiListMeta['length']['current'];
type ContentStoreListResultMetaLengthTotal = ApiListMeta['length']['total'];
type ContentStoreListResultMetaPageIsNext = ApiListMeta['page']['isNext'];
type ContentStoreListResultMetaPageNext = ApiListMeta['page']['next'];
type ContentStoreListResult = {
  data: {
    _items: ContentStoreListResultDataItems;
    add: (data: ApiListData) => void;
    clear: () => void;
    isItems: boolean;
    items: ContentStoreListResultDataItems;
  };
  meta: {
    length: {
      _current: ContentStoreListResultMetaLengthCurrent;
      _total: ContentStoreListResultMetaLengthTotal;
      current: ContentStoreListResultMetaLengthCurrent;
      setCurrent: (value: ContentStoreListResultMetaLengthCurrent) => void;
      setTotal: (value: ContentStoreListResultMetaLengthTotal) => void;
      total: ContentStoreListResultMetaLengthTotal;
    };
    page: {
      _isNext: ContentStoreListResultMetaPageIsNext;
      isNext: ContentStoreListResultMetaPageIsNext;
      next: ContentStoreListResultMetaPageNext;
      reset: () => void;
      setIsNext: (value: ContentStoreListResultMetaPageIsNext) => void;
      setNext: (value: ContentStoreListResultMetaPageNext) => void;
    };
    set: (value: ApiListMeta) => void;
  };
};
