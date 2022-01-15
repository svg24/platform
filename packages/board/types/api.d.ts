import type { Item, List, Simple } from '@svg24/api/types';

declare namespace Api {
  function categories(): Promise<CategoriesResponse>;
  function companies(): Promise<CompaniesResponse>;
  function item(params: Item.RouteQuery): Promise<ItemResponse>;
  function list(params: List.RouteQuery): Promise<ListResponse>;
  function sortBy(): Promise<SortByResponse>;
  type KeysSimpleMethods = 'categories' | 'companies' | 'sortBy';
  /**
   * `api.categories()`
   */
  type CategoriesResponse = Simple.RouteResponse;
  type CategoriesResponseData = Simple.RouteResponseData;
  type CategoriesResponseDataPropertyItem = Simple.RouteResponseDataPropertyItem;
  /**
   * `api.companies()`
   */
  type CompaniesResponse = Simple.RouteResponse;
  type CompaniesResponseData = Simple.RouteResponseData;
  type CompaniesResponseDataPropertyItem = Simple.RouteResponseDataPropertyItem;
  /**
   * `api.list()`
   */
  type ListResponse = List.RouteResponse;
  type ListResponseData = List.RouteResponseData;
  type ListResponseDataItem = List.RouteResponseDataItem;
  type ListResponseMeta = List.RouteResponseMeta;
  type ListResponseMetaLengthCurrent = List.RouteResponseMetaLengthCurrent;
  type ListResponseMetaLengthTotal = List.RouteResponseMetaLengthTotal;
  type ListResponseMetaMultiplier = List.RouteResponseMetaMultiplier;
  type ListResponseMetaPageHasNext = List.RouteResponseMetaPageHasNext;
  type ListResponseMetaPageNext = List.RouteResponseMetaPageNext;
  /**
   * `api.item()`
   */
  type ItemResponse = Item.RouteResponse;
  type ItemResponseDataItem = Item.RouteResponseDataItem;
  type ItemResponseDataItemContent = Item.RouteResponseDataItemContent;
  type ItemResponseDataItemContentTypes = Item.RouteResponseDataItemContentTypes;
  type ItemResponseMeta = Item.RouteResponseMeta;
  type ItemResponseMetaCategory = Item.RouteResponseMetaCategory;
  type ItemResponseMetaCompany = Item.RouteResponseMetaCompany;
  type ItemResponseMetaId = Item.RouteResponseMetaId;
  type ItemResponseMetaName = Item.RouteResponseMetaName;
  /**
   * `api.sortBy()`
   */
  type SortByResponse = {
    data: SortByResponseData;
    meta: {
      default: SortByResponseDataItem;
    };
  };
  type SortByResponseData = SortByResponseDataItem[];
  type SortByResponseDataItem = Simple.RouteResponseDataPropertyItem;
}

export = Api;
