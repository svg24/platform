export type ApiSimpleIds = 'categories' | 'companies' | 'sortBy';

export type ApiSimple = {
  data: ApiSimpleData;
  meta: ApiSimpleMeta;
};
type ApiSimpleData = ApiSimpleDataItem[];
type ApiSimpleDataItem = {
  id: string;
  name: string;
};
type ApiSimpleMeta = {
  default: ApiSimpleDataItem;
};

export type ApiSimpleAlphabetical = {
  data: ApiSimpleAlphabeticalData;
  meta: any;
};
type ApiSimpleAlphabeticalData = {
  [key: string]: ApiSimpleData;
};

export type ApiList = {
  data: ApiListData;
  meta: ApiListMeta;
};
export type ApiListData = ApiListDataItem[];
export type ApiListDataItem = {
  id: string;
  isMany: boolean;
  latest: string;
  name: string;
};
type ApiListMeta = {
  length: {
    current: number;
    total: number;
  };
  page: {
    isNext: boolean;
    next: number;
  };
};

export type ApiItem = {
  data: ApiItemData;
  meta: ApiItemMeta;
};
type ApiItemData = ApiItemDataItem[];
type ApiItemDataItem = {
  content: {
    [key in ApiItemDataItemTypes]?: {
      components: {
        react: {
          js: string;
          ts: string;
        };
        vue: {
          js: string;
        };
      };
      links: {
        url: string;
      };
      packages: {
        react: string;
        vue: string;
      };
      snippets: {
        css: string;
        jsx: string;
        svg: string;
      };
    };
  };
  file: {
    camel: string;
    snake: string;
  };
  version: number;
};
type ApiItemDataItemTypes = 'square' | 'original';
type ApiItemMeta = {
  category: ApiSimpleDataItem;
  company: ApiSimpleDataItem;
  id: string;
  name: string;
  src: {
    product: string;
    usage: string;
  };
};
