import type {
  ApiItemDataItem,
  ApiItemDataItemTypes,
  ApiItemMeta,
  ApiListDataItem,
} from 'types/api';

export interface BagStore {
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
  setType: (type: BagStoreItemSettingsTypes) => void;
  type: BagStoreItemSettingsTypes | null;
};
type BagStoreItemSettingsAction = (args: {
  content: string;
  file: string;
}) => Promise<void>;
type BagStoreItemSettingsTypes = ApiItemDataItemTypes;

type BagStoreList = {
  add: (id: BagStoreListIdsItem) => void;
  clear: () => void;
  delete: (id: BagStoreListIdsItem) => void;
  ids: Set<BagStoreListIdsItem | null>;
};
type BagStoreListIdsItem = ApiListDataItem['id'];

export type BagSettingsParameters
  = BagSettingsParameterTypes | BagSettingsParameterActions;

export interface BagSettingsParameterActions
  extends BagSettingsParameter<BagSettingsParameterActionsOptionsItem> {}
interface BagSettingsParameterActionsOptionsItem
  extends BagSettingsParameterOptionsItem {
  handler: BagStoreItemSettingsAction;
  id: string;
}

export interface BagSettingsParameterTypes
  extends BagSettingsParameter<BagSettingsParameterTypesOptionsItem> {}
interface BagSettingsParameterTypesOptionsItem
  extends BagSettingsParameterOptionsItem {
  id: BagStoreItemSettingsTypes;
}

interface BagSettingsParameter<Item extends BagSettingsParameterOptionsItem> {
  id: string;
  legend: string;
  onChange: (item: Item) => void;
  options: Item[];
}
interface BagSettingsParameterOptionsItem {
  checked?: boolean;
  name: string;
}
