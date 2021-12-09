import type {
  ApiItemDataItem,
  ApiItemDataItemTypes,
  ApiItemMeta,
  ApiListDataItem,
} from 'types/api';
import type { Store } from 'types/store';

export interface BagStore extends Store<BagStore> {
  item: {
    _data: ApiItemDataItem | null;
    action: BagStoreItemAction | null;
    data: BagStore['item']['_data'];
    meta: ApiItemMeta | null;
    setAction: (action: BagStoreItemAction) => void;
    setData: (data: ApiItemDataItem) => void;
    setMeta: (meta: ApiItemMeta) => void;
    setType: (type: BagStoreItemType) => void;
    type: BagStoreItemType | null;
  };
  list: {
    add: (id: ApiListDataItem['id']) => void;
    clear: () => void;
    delete: (id: ApiListDataItem['id']) => void;
    ids: Set<ApiListDataItem['id'] | null>;
  };
}

export type BagStoreItemAction = (args: {
  content: string;
  file: string;
}) => (
  Promise<void>
);

export type BagStoreItemType = ApiItemDataItemTypes;
