import type { Dirent } from 'fs';
import type {
  ItemData,
  ItemDataItem,
  ItemDataItemContent,
  ItemDataItemVersion,
  ItemRouteQuery,
} from 'types/item';
import type {
  ListDataItem,
  ListDataItemIsMore,
  ListDataItemLatest,
  ListSchema,
} from 'types/list';

export interface DB {
  connect: () => Promise<void>;
  init: () => Promise<void>;
  item: DBItem;
  list: DBList;
  opts: {
    name: string;
    pass: string;
    src: string;
    uri: string;
    user: string;
  };
}

type DBItem = {
  getData: (id: DBItemParameterId) => Promise<ItemData>;
  getDataItem: (id: DBItemParameterId, name: DBItemParameterName) => (
    Promise<ItemDataItem>
  );
  getDataItemContent: (id: DBItemParameterId, name: DBItemParameterName) => (
    Promise<ItemDataItemContent>
  );
  getDataItemVersion: (id: DBItemParameterId) => Promise<ItemDataItemVersion>;
};
type DBItemParameterId = ItemRouteQuery['id'];
type DBItemParameterName = Dirent['name'];

type DBList = {
  getDataItem: (id: DBListParameterId) => Promise<ListDataItem>;
  getDataItemIsMore: (id: DBListParameterId) => Promise<ListDataItemIsMore>;
  getDataItemLatest: (id: DBListParameterId) => Promise<ListDataItemLatest>;
};
type DBListParameterId = ListSchema['id'];
