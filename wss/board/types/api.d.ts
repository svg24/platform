declare namespace Api {
  /**
   * `api.categories()`
   */
  type Categories = SimpleAlphabetical;
  /**
   * `api.companies()`
   */
  type Companies = SimpleAlphabetical;
  /**
   * `api.list()`
   */
  type List = {
    data: ListData;
    meta: ListMeta;
  };
  type ListData = ListDataItem[];
  type ListDataItem = {
    id: string;
    isMany: boolean;
    latest: string;
    name: string;
  };
  type ListDataItemId = string;
  type ListMeta = {
    length: ListMetaLength;
    page: ListMetaPage;
  };
  type ListMetaLength = {
    current: ListMetaLengthCurrent;
    total: ListMetaLengthTotal;
  };
  type ListMetaLengthCurrent = number;
  type ListMetaLengthTotal = number;
  type ListMetaPage = {
    isNext: ListMetaPageIsNext;
    next: ListMetaPageNext;
  };
  type ListMetaPageIsNext = boolean;
  type ListMetaPageNext = number;
  /**
   * `api.item()`
   */
  type Item = {
    data: ItemData;
    meta: ItemMeta;
  };
  type ItemData = ItemDataItem[];
  type ItemDataItem = {
    content: ItemDataItemContent;
    file: ItemDataItemFile;
    version: ItemDataItemVersion;
  };
  type ItemDataItemContent = {
    [key in ItemDataItemContentTypes]?: {
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
  type ItemDataItemContentTypes = 'square' | 'original';
  type ItemDataItemFile = {
    camel: string;
    snake: string;
  };
  type ItemDataItemVersion = number;
  type ItemMeta = {
    category: ItemMetaCategory;
    company: ItemMetaCompany;
    id: string;
    name: string;
    src: {
      product: string;
      usage: string;
    };
  };
  type ItemMetaCategory = SimpleDataItem;
  type ItemMetaCompany = SimpleDataItem;

  type SimpleIds = 'categories' | 'companies' | 'sortBy';
  type Simple = {
    data: SimpleData;
    meta: SimpleMeta;
  };
  type SimpleData = SimpleDataItem[];
  type SimpleDataItem = {
    id: string;
    name: string;
  };
  type SimpleMeta = {
    default: SimpleDataItem;
  };

  type SimpleAlphabetical = {
    data: SimpleAlphabeticalData;
    meta: any;
  };
  type SimpleAlphabeticalData = {
    [key: string]: SimpleData;
  };
}

export = Api;
