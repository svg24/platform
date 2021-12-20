import type { RegisterOptions } from 'fastify';
import type { SchemaId } from 'types/list';
import type Server from 'types/server';

declare namespace Item {
  const options: RegisterOptions;
  function plugin(inst: typeof Server.inst): Promise<void>;

  type RouteQuery = {
    id: RouteQueryId;
  };
  type RouteQueryId = SchemaId;

  type RouteResponse = {
    data: RouteResponseData;
  };
  type RouteResponseData = RouteResponseDataItem[];
  type RouteResponseDataItem = {
    content: RouteResponseDataItemContent;
    file: RouteResponseDataItemFile;
    version: RouteResponseDataItemVersion;
  };
  type RouteResponseDataItemContent = {
    [key in RouteResponseDataItemContentTypes]?: RouteResponseDataItemContentItem;
  };
  type RouteResponseDataItemContentTypes = 'square' | 'original';
  type RouteResponseDataItemContentItem = {
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
      svg: RouteResponseDataItemContentItemSnippetsSVG;
    };
  };
  type RouteResponseDataItemContentItemSnippetsSVG = string;
  type RouteResponseDataItemFile = {
    camel: string;
    snake: string;
  };
  type RouteResponseDataItemVersion = number;

  function getData(id: RouteQueryId): Promise<RouteResponseData>;
  function getDataItem(
    id: RouteQueryId,
    name: string,
  ): Promise<RouteResponseDataItem>;
  function getDataItemContent(
    path: string,
    component: string,
  ): Promise<RouteResponseDataItemContent>;
  function getDataItemFile(
    name: string,
    component: string,
  ): RouteResponseDataItemFile;
  function getDataItemVersion(name: string): (
    Promise<RouteResponseDataItemVersion>
  );
}

export = Item;
