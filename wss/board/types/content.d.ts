import type {
  Item,
  List,
  ListData,
  ListMeta,
  ListMetaLengthCurrent,
  ListMetaLengthTotal,
  ListMetaPageIsNext,
  ListMetaPageNext,
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
  result: Item | null;
};

type ContentStoreList = {
  fetch: (multiplier?: number) => Promise<List>;
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
  add: (data: ListData) => void;
  clear: () => void;
  isItems: boolean;
  items: ContentStoreListResultDataItems;
};
type ContentStoreListResultDataItems = ListData | [];
type ContentStoreListResultMeta = {
  length: ContentStoreListResultMetaLength;
  page: ContentStoreListResultMetaPage;
  set: (value: ListMeta) => void;
};
type ContentStoreListResultMetaLength = {
  _current: ContentStoreListResultMetaLengthCurrent;
  _total: ContentStoreListResultMetaLengthTotal;
  current: ContentStoreListResultMetaLengthCurrent;
  setCurrent: (value: ContentStoreListResultMetaLengthCurrent) => void;
  setTotal: (value: ContentStoreListResultMetaLengthTotal) => void;
  total: ContentStoreListResultMetaLengthTotal;
};
type ContentStoreListResultMetaLengthCurrent = ListMetaLengthCurrent;
type ContentStoreListResultMetaLengthTotal = ListMetaLengthTotal;
type ContentStoreListResultMetaPage = {
  _isNext: ContentStoreListResultMetaPageIsNext;
  isNext: ContentStoreListResultMetaPageIsNext;
  next: ContentStoreListResultMetaPageNext;
  reset: () => void;
  setIsNext: (value: ContentStoreListResultMetaPageIsNext) => void;
  setNext: (value: ContentStoreListResultMetaPageNext) => void;
};
type ContentStoreListResultMetaPageIsNext = ListMetaPageIsNext;
type ContentStoreListResultMetaPageNext = ListMetaPageNext;
