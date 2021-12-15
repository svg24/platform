import type {
  ApiItem,
  ApiList,
  ApiListData,
  ApiListMeta,
} from 'types/api';
import type { StoreVisible } from 'types/store';

export interface ContentStore {
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
type ContentStoreListResult = {
  data: ContentStoreListResultData;
  meta: ContentStoreListResultMeta;
};
type ContentStoreListResultData = {
  _items: ContentStoreListResultDataItems;
  add: (data: ApiListData) => void;
  clear: () => void;
  isItems: boolean;
  items: ContentStoreListResultDataItems;
};
type ContentStoreListResultDataItems = ApiListData | [];
type ContentStoreListResultMeta = {
  length: ContentStoreListResultMetaLength;
  page: ContentStoreListResultMetaPage;
  set: (value: ApiListMeta) => void;
};
type ContentStoreListResultMetaLength = {
  _current: ContentStoreListResultMetaLengthCurrent;
  _total: ContentStoreListResultMetaLengthTotal;
  current: ContentStoreListResultMetaLengthCurrent;
  setCurrent: (value: ContentStoreListResultMetaLengthCurrent) => void;
  setTotal: (value: ContentStoreListResultMetaLengthTotal) => void;
  total: ContentStoreListResultMetaLengthTotal;
};
type ContentStoreListResultMetaLengthCurrent = ApiListMeta['length']['current'];
type ContentStoreListResultMetaLengthTotal = ApiListMeta['length']['total'];
type ContentStoreListResultMetaPage = {
  _isNext: ContentStoreListResultMetaPageIsNext;
  isNext: ContentStoreListResultMetaPageIsNext;
  next: ContentStoreListResultMetaPageNext;
  reset: () => void;
  setIsNext: (value: ContentStoreListResultMetaPageIsNext) => void;
  setNext: (value: ContentStoreListResultMetaPageNext) => void;
};
type ContentStoreListResultMetaPageIsNext = ApiListMeta['page']['isNext'];
type ContentStoreListResultMetaPageNext = ApiListMeta['page']['next'];
