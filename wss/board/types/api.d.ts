declare namespace Api {
  function categories(): Promise<CategoriesResponse>;
  function companies(): Promise<CompaniesResponse>;
  function item(params: {
    id: ItemResponseMetaId;
  }): Promise<ItemResponse>;
  function list(params: {
    category?: CategoriesResponseDataPropertyItemId;
    company?: CompaniesResponseDataPropertyItemId;
    multiplier?: ListResponseMetaMultiplier;
    name?: ItemResponseMetaName;
    page?: ListResponseMetaPageNext;
    sortBy?: SortByResponseDataItemId;
  }): Promise<ListResponse>;
  function sortBy(): Promise<SortByResponse>;
  type KeysSimpleMethods = 'categories' | 'companies' | 'sortBy';
  /**
   * `api.categories()`
   */
  type CategoriesResponse = SimpleAlphabeticalResponse;
  type CategoriesResponseData = CategoriesResponse['data'];
  type CategoriesResponseDataPropertyItem = CategoriesResponseData[''][0];
  type CategoriesResponseDataPropertyItemId
    = CategoriesResponseDataPropertyItem['id'];
  /**
   * `api.companies()`
   */
  type CompaniesResponse = SimpleAlphabeticalResponse;
  type CompaniesResponseData = CompaniesResponse['data'];
  type CompaniesResponseDataPropertyItem = CompaniesResponseData[''][0];
  type CompaniesResponseDataPropertyItemId
    = CompaniesResponseDataPropertyItem['id'];
  /**
   * `api.list()`
   */
  type ListResponse = {
    data: ListResponseData;
    meta: ListResponseMeta;
  };
  type ListResponseData = ListResponseDataItem[];
  type ListResponseDataItem = {
    id: ItemResponseMetaId;
    isMany: boolean;
    latest: string;
    name: ItemResponseMetaName;
  };
  type ListResponseMeta = {
    length: ListResponseMetaLength;
    multiplier?: ListResponseMetaMultiplier;
    page: ListResponseMetaPage;
  };
  type ListResponseMetaLength = {
    current: ListResponseMetaLengthCurrent;
    total: ListResponseMetaLengthTotal;
  };
  type ListResponseMetaLengthCurrent = number;
  type ListResponseMetaLengthTotal = number;
  type ListResponseMetaMultiplier = number;
  type ListResponseMetaPage = {
    isNext: ListResponseMetaPageIsNext;
    next: ListResponseMetaPageNext;
  };
  type ListResponseMetaPageIsNext = boolean;
  type ListResponseMetaPageNext = number;
  /**
   * `api.item()`
   */
  type ItemResponse = {
    data: ItemResponseData;
    meta: ItemResponseMeta;
  };
  type ItemResponseData = ItemResponseDataItem[];
  type ItemResponseDataItem = {
    content: ItemResponseDataItemContent;
    file: ItemResponseDataItemFile;
    version: ItemResponseDataItemVersion;
  };
  type ItemResponseDataItemContent = {
    [key in ItemResponseDataItemContentTypes]?: {
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
  type ItemResponseDataItemContentTypes = 'square' | 'original';
  type ItemResponseDataItemFile = {
    camel: string;
    snake: string;
  };
  type ItemResponseDataItemVersion = number;
  type ItemResponseMeta = {
    category: ItemResponseMetaCategory;
    company: ItemResponseMetaCompany;
    id: ItemResponseMetaId;
    name: ItemResponseMetaName;
    src: {
      product: string;
      usage: string;
    };
  };
  type ItemResponseMetaCategory = CategoriesResponseDataPropertyItem;
  type ItemResponseMetaCompany = CompaniesResponseDataPropertyItem;
  type ItemResponseMetaId = string;
  type ItemResponseMetaName = string;
  /**
   * `api.sortBy()`
   */
  type SortByResponse = SimpleResponse;
  type SortByResponseData = SortByResponse['data'];
  type SortByResponseDataItem = SortByResponseData[0];
  type SortByResponseDataItemId = SortByResponseDataItem['id'];
}

type SimpleResponse = {
  data: SimpleResponseData;
  meta: {
    default: SimpleResponseDataItem;
  };
};
type SimpleResponseData = SimpleResponseDataItem[];
type SimpleResponseDataItem = {
  id: string;
  name: string;
};
type SimpleAlphabeticalResponse = {
  data: SimpleAlphabeticalResponseData;
  meta: any;
};
type SimpleAlphabeticalResponseData = {
  [key: string]: SimpleResponseData;
};

export = Api;
