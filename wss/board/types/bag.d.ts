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
  data: BagStoreItemData;
  meta: ApiItemMeta | null;
  setData: (data: ApiItemDataItem) => void;
  setMeta: (meta: ApiItemMeta) => void;
  settings: BagStoreItemSettings;
};
type BagStoreItemData = ApiItemDataItem | null;
type BagStoreItemSettings = {
  action: BagStoreItemSettingsAction | null;
  setAction: (action: BagStoreItemSettingsAction) => void;
  setType: (type: BagStoreItemSettingsType) => void;
  type: BagStoreItemSettingsType | null;
};
export type BagStoreItemSettingsAction = (args: {
  content: string;
  file: string;
}) => Promise<void>;
export type BagStoreItemSettingsType = ApiItemDataItemTypes;

type BagStoreList = {
  add: (id: BagStoreListIdsItem) => void;
  clear: () => void;
  delete: (id: BagStoreListIdsItem) => void;
  ids: Set<BagStoreListIdsItem | null>;
};
type BagStoreListIdsItem = ApiListDataItem['id'];
