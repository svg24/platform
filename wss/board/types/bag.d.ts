import type {
  ApiItemDataItem,
  ApiItemDataItemTypes,
  ApiItemMeta,
  ApiListDataItem,
} from 'types/api';
import type { Store } from 'types/store';

export interface BagStore extends Store<BagStore> {
  item: BagStoreItem;
  list: BagStoreList;
}

type BagStoreItem = {
  _data: BagStoreItemData;
  action: BagStoreItemAction | null;
  data: BagStoreItemData;
  meta: ApiItemMeta | null;
  setAction: (action: BagStoreItemAction) => void;
  setData: (data: ApiItemDataItem) => void;
  setMeta: (meta: ApiItemMeta) => void;
  setType: (type: BagStoreItemType) => void;
  type: BagStoreItemType | null;
};
type BagStoreItemData = ApiItemDataItem | null;
export type BagStoreItemAction = (args: {
  content: string;
  file: string;
}) => Promise<void>;
export type BagStoreItemType = ApiItemDataItemTypes;

type BagStoreList = {
  add: (id: BagStoreListIdsItem) => void;
  clear: () => void;
  delete: (id: BagStoreListIdsItem) => void;
  ids: Set<BagStoreListIdsItem | null>;
};
type BagStoreListIdsItem = ApiListDataItem['id'];
