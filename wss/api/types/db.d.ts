import type { ContentRouteParameters } from 'types/content';
import type {
  ItemData,
  ItemDataItem,
  ItemDataItemContent,
  ItemDataItemContentType,
  ItemDataItemFile,
  ItemDataItemVersion,
  ItemRouteQuery,
} from 'types/item';
import type {
  ListDataItem,
  ListDataItemIsMany,
  ListDataItemLatest,
  ListSchema,
} from 'types/list';

export interface DB {
  connect: () => Promise<void>;
  init: () => Promise<void>;
  modules: {
    content: DBModulesContent;
    item: DBModulesItem;
    list: DBModulesList;
  };
  opts: {
    local: string;
    name: string;
    pass: string;
    uri: string;
    user: string;
  };
}

type DBModulesContent = {
  get: (
    id: ContentRouteParameters['id'],
    name: ContentRouteParameters['name'],
  ) => Promise<ItemDataItemContentType['snippets']['svg']>;
};

type DBModulesItemParameterId = ItemRouteQuery['id'];
type DBModulesItem = {
  getData: (id: DBModulesItemParameterId) => Promise<ItemData>;
  getDataItem: (id: DBModulesItemParameterId, direntName: string) => Promise<ItemDataItem>;
  getDataItemContent: (path: string, componentName: string) => Promise<ItemDataItemContent>;
  getDataItemFile: (componentName: string, direntName: string) => ItemDataItemFile;
  getDataItemVersion: (direntName: string) => Promise<ItemDataItemVersion>;
};

type DBModulesListParameterId = ListSchema['id'];
type DBModulesList = {
  getDataItem: (id: DBModulesListParameterId) => Promise<ListDataItem>;
  getDataItemIsMany: (id: DBModulesListParameterId) => Promise<ListDataItemIsMany>;
  getDataItemLatest: (id: DBModulesListParameterId) => Promise<ListDataItemLatest>;
};
