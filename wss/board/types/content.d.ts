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
  data: {
    _items: ApiListData | [];
    add: (data: ApiListData) => void;
    clear: () => void;
    isItems: boolean;
    items: ContentStoreList['data']['_items'];
  };
  fetch: (multiplier?: number) => Promise<ApiList>;
  meta: {
    length: {
      _cur: ApiListMeta['length']['current'];
      _total: ApiListMeta['length']['total'];
      cur: ContentStoreList['meta']['length']['_cur'];
      setCur: (val: ContentStoreList['meta']['length']['_cur']) => void;
      setTotal: (val: ContentStoreList['meta']['length']['_total']) => void;
      total: ContentStoreList['meta']['length']['_total'];
    };
    page: {
      _isNext: ApiListMeta['page']['isNext'];
      isNext: ContentStoreList['meta']['page']['_isNext'];
      next: ApiListMeta['page']['next'];
      reset: () => void;
      setIsNext: (val: ContentStoreList['meta']['page']['_isNext']) => void;
      setNext: (val: ContentStoreList['meta']['page']['next']) => void;
    };
    set: (val: ApiListMeta) => void;
  };
  reset: () => Promise<void>;
  upload: () => Promise<void>;
};
