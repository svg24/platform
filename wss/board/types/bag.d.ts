import type {
  ItemDataItem,
  ItemDataItemContentTypes,
  ItemMeta,
  ListDataItemId,
} from 'types/api';

declare namespace Bag {
  /**
   * `bag`
   */
  type Store = {
    item: StoreItem;
    list: StoreList;
  };
  /**
   * `bag.item`
   */
  type StoreItem = {
    _data: StoreItemData;
    data: StoreItemData;
    meta: ItemMeta | null;
    setData: (data: ItemDataItem) => void;
    setMeta: (meta: ItemMeta) => void;
    settings: StoreItemSettings;
  };
  type StoreItemData = ItemDataItem | null;
  type StoreItemSettings = {
    action: StoreItemSettingsAction | null;
    setAction: (action: StoreItemSettingsAction) => void;
    setType: (type: StoreItemSettingsTypes) => void;
    type: StoreItemSettingsTypes | null;
  };
  type StoreItemSettingsAction = (props: {
    content: string;
    file: string;
  }) => Promise<void>;
  type StoreItemSettingsTypes = ItemDataItemContentTypes;
  /**
   * `bag.list`
   */
  type StoreList = Set<ListDataItemId | null>;
  /**
   * `BagSettingsActions()`
   */
  interface SettingsParameterActions
    extends SettingsParameter<SettingsParameterActionsOptionsItem> {}
  interface SettingsParameterActionsOptionsItem
    extends SettingsParameterOptionsItem {
    handler: StoreItemSettingsAction;
    id: string;
  }
  /**
   * `BagSettingsTypes()`
   */
  interface SettingsParameterTypes
    extends SettingsParameter<SettingsParameterTypesOptionsItem> {}
  interface SettingsParameterTypesOptionsItem
    extends SettingsParameterOptionsItem {
    id: StoreItemSettingsTypes;
  }
}

interface SettingsParameter<Item extends SettingsParameterOptionsItem> {
  id: string;
  legend: string;
  onChange: (item: Item) => void;
  options: Item[];
}
type SettingsParameterOptionsItem = {
  checked?: boolean;
  name: string;
};

export = Bag;
