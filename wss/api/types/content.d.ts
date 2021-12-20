import type { RegisterOptions } from 'fastify';
import type { RouteResponseDataItemContentItemSnippetsSVG } from 'types/item';
import type { SchemaId } from 'types/list';
import type Server from 'types/server';

declare namespace Content {
  const options: RegisterOptions;
  function plugin(inst: typeof Server.inst): Promise<void>;

  type RouteParameters = {
    id: RouteParametersId;
    name: RouteParametersName;
  };
  type RouteParametersId = SchemaId;
  type RouteParametersName = SchemaId;

  function getContent(
    id: RouteParametersId,
    name: RouteParametersName,
  ): Promise<RouteResponseDataItemContentItemSnippetsSVG>;
}

export = Content;
