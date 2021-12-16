import type {
  ItemResponse,
  ListResponse,
  ListResponseData,
  ListResponseDataItem,
  ListResponseMeta,
  ListResponseMetaLengthCurrent,
  ListResponseMetaLengthTotal,
  ListResponseMetaMultiplier,
  ListResponseMetaPageIsNext,
  ListResponseMetaPageNext,
} from 'types/api';
import type { Visible } from 'types/store';

declare namespace Content {
  /**
   * `content`
   */
  interface Store {
    item: StoreItem;
    list: StoreList;
    sentinel: Visible;
  }
  /**
   * `content.item`
   */
  type StoreItem = {
    clear: () => void;
    fetch: () => Promise<void>;
    result: ItemResponse | null;
  };
  /**
   * `content.list`
   */
  type StoreList = {
    fetch: (multiplier?: ListResponseMetaMultiplier) => Promise<ListResponse>;
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
    add: (data: ListResponseData) => void;
    clear: () => void;
    isItems: boolean;
    items: StoreListResultDataItems;
  };
  type StoreListResultDataItems = ListResponseData | [];
  type StoreListResultDataItemsItem = ListResponseDataItem;
  type StoreListResultMeta = {
    length: StoreListResultMetaLength;
    page: StoreListResultMetaPage;
    set: (meta: ListResponseMeta) => void;
  };
  type StoreListResultMetaLength = {
    _current: StoreListResultMetaLengthCurrent;
    _total: StoreListResultMetaLengthTotal;
    current: StoreListResultMetaLengthCurrent;
    setCurrent: (current: StoreListResultMetaLengthCurrent) => void;
    setTotal: (total: StoreListResultMetaLengthTotal) => void;
    total: StoreListResultMetaLengthTotal;
  };
  type StoreListResultMetaLengthCurrent = ListResponseMetaLengthCurrent;
  type StoreListResultMetaLengthTotal = ListResponseMetaLengthTotal;
  type StoreListResultMetaPage = {
    _isNext: StoreListResultMetaPageIsNext;
    isNext: StoreListResultMetaPageIsNext;
    next: StoreListResultMetaPageNext;
    reset: () => void;
    setIsNext: (isNext: StoreListResultMetaPageIsNext) => void;
    setNext: (next: StoreListResultMetaPageNext) => void;
  };
  type StoreListResultMetaPageIsNext = ListResponseMetaPageIsNext;
  type StoreListResultMetaPageNext = ListResponseMetaPageNext;
}

export = Content;
