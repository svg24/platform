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
import type { UserStoreContent } from 'types/user';

declare namespace Content {
  /**
   * `content`
   */
  interface Store {
    item: StoreItem;
    list: StoreList;
    sentinel: StoreVisible;
  }
  /**
   * `content.item`
   */
  type StoreItem = {
    clear: () => void;
    fetch: () => Promise<void>;
    result: Item | null;
  };
  /**
   * `content.list`
   */
  type StoreList = {
    fetch: (multiplier?: UserStoreContent['list']['multiplier']['value']['current']) => Promise<List>;
    reset: () => Promise<void>;
    result: StoreListResult;
    upload: () => Promise<void>;
  };
  type StoreListResult = {
    data: StoreListResultData;
    meta: StoreListResultMeta;
  };
  type StoreListResultData = {
    _items: StoreListResultDataItems;
    add: (data: ListData) => void;
    clear: () => void;
    isItems: boolean;
    items: StoreListResultDataItems;
  };
  type StoreListResultDataItems = ListData | [];
  type StoreListResultMeta = {
    length: StoreListResultMetaLength;
    page: StoreListResultMetaPage;
    set: (meta: ListMeta) => void;
  };
  type StoreListResultMetaLength = {
    _current: StoreListResultMetaLengthCurrent;
    _total: StoreListResultMetaLengthTotal;
    current: StoreListResultMetaLengthCurrent;
    setCurrent: (current: StoreListResultMetaLengthCurrent) => void;
    setTotal: (total: StoreListResultMetaLengthTotal) => void;
    total: StoreListResultMetaLengthTotal;
  };
  type StoreListResultMetaLengthCurrent = ListMetaLengthCurrent;
  type StoreListResultMetaLengthTotal = ListMetaLengthTotal;
  type StoreListResultMetaPage = {
    _isNext: StoreListResultMetaPageIsNext;
    isNext: StoreListResultMetaPageIsNext;
    next: StoreListResultMetaPageNext;
    reset: () => void;
    setIsNext: (isNext: StoreListResultMetaPageIsNext) => void;
    setNext: (next: StoreListResultMetaPageNext) => void;
  };
  type StoreListResultMetaPageIsNext = ListMetaPageIsNext;
  type StoreListResultMetaPageNext = ListMetaPageNext;
}

export = Content;
