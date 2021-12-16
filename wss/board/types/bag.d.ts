import type {
  ItemResponseDataItem,
  ItemResponseDataItemContentTypes,
  ItemResponseMeta,
  ItemResponseMetaCategory,
  ItemResponseMetaCompany,
  ItemResponseMetaId,
} from 'types/api';
import type {
  StoreKeyParameterCategory,
  StoreKeyParameterCompany,
} from 'types/filter';
import type { ParameterAdditionalProperties } from 'types/form';

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
    meta: ItemResponseMeta | null;
    setData: (data: ItemResponseDataItem) => void;
    setMeta: (meta: ItemResponseMeta) => void;
    settings: StoreItemSettings;
  };
  type StoreItemData = ItemResponseDataItem | null;
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
  type StoreItemSettingsTypes = ItemResponseDataItemContentTypes;
  /**
   * `bag.list`
   */
  type StoreList = Set<ItemResponseMetaId | null>;
  /**
   * `BagMetaGeneral()`
   */
  type MetaGeneralItem = {
    id: (StoreKeyParameterCategory | StoreKeyParameterCompany);
    label: string;
    meta: (ItemResponseMetaCategory | ItemResponseMetaCompany) | undefined;
  };
  /**
   * `BagMetaIndividual()`
   */
  type MetaIndividualItem = {
    id: string;
    label: string;
    meta: string | undefined;
  };
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

interface SettingsParameter<
  Item extends SettingsParameterOptionsItem,
> extends ParameterAdditionalProperties {
  id: string;
  onChange: (item: Item) => void;
  options: Item[];
}
type SettingsParameterOptionsItem = {
  checked?: boolean;
  name: string;
};

export = Bag;
