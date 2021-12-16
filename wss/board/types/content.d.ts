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
    response: ItemResponse | null;
  };
  /**
   * `content.list`
   */
  type StoreList = {
    fetch: (multiplier?: ListResponseMetaMultiplier) => Promise<ListResponse>;
    reset: () => Promise<void>;
    response: StoreListResponse;
    upload: () => Promise<void>;
  };
  type StoreListResponse = {
    data: StoreListResponseData;
    meta: StoreListResponseMeta;
  };
  type StoreListResponseData = {
    _items: StoreListResponseDataItems;
    add: (data: ListResponseData) => void;
    clear: () => void;
    isItems: boolean;
    items: StoreListResponseDataItems;
  };
  type StoreListResponseDataItems = ListResponseData | [];
  type StoreListResponseDataItemsItem = ListResponseDataItem;
  type StoreListResponseMeta = {
    length: StoreListResponseMetaLength;
    page: StoreListResponseMetaPage;
    set: (meta: ListResponseMeta) => void;
  };
  type StoreListResponseMetaLength = {
    _current: StoreListResponseMetaLengthCurrent;
    _total: StoreListResponseMetaLengthTotal;
    current: StoreListResponseMetaLengthCurrent;
    setCurrent: (current: StoreListResponseMetaLengthCurrent) => void;
    setTotal: (total: StoreListResponseMetaLengthTotal) => void;
    total: StoreListResponseMetaLengthTotal;
  };
  type StoreListResponseMetaLengthCurrent = ListResponseMetaLengthCurrent;
  type StoreListResponseMetaLengthTotal = ListResponseMetaLengthTotal;
  type StoreListResponseMetaPage = {
    _isNext: StoreListResponseMetaPageIsNext;
    isNext: StoreListResponseMetaPageIsNext;
    next: StoreListResponseMetaPageNext;
    reset: () => void;
    setIsNext: (isNext: StoreListResponseMetaPageIsNext) => void;
    setNext: (next: StoreListResponseMetaPageNext) => void;
  };
  type StoreListResponseMetaPageIsNext = ListResponseMetaPageIsNext;
  type StoreListResponseMetaPageNext = ListResponseMetaPageNext;
}

export = Content;
