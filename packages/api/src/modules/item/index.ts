import { promises as fs } from 'fs';
import type { Constructor, RouteResponseData } from 'types/item';
import { db } from '../../core';
import {
  getVersion,
  removeExtension,
  toCSS,
  toComponentName,
  toContent,
  toJSX,
  toReactJS,
  toReactTS,
  toVueJS,
  toVueTS,
} from '../../utils';
import { addRoute } from './route';

export const item = new (function Item(this: Constructor) {
  this.options = {
    prefix: 'item',
  };

  this.plugin = async (inst) => {
    addRoute.call(this, inst);
  };

  this.getData = async (id) => {
    const dirents = await fs.readdir(`${db.options.logos}/${id}`, {
      withFileTypes: true,
    });
    const data = [] as RouteResponseData;

    await Promise.all(dirents.map(async (dirent) => {
      if (!dirent.isSymbolicLink()) {
        data.push(await this.getDataItem(id, dirent.name));
      }
    }));

    return data;
  };

  this.getDataItem = async (id, name) => {
    const componentName = toComponentName(name);
    const local = `${id}/${name}`;
    const buf = await fs.readFile(`${db.options.logos}/${local}`);
    const svg = buf.toString();
    const css = toCSS(buf.toString('base64'));
    const jsx = toJSX(svg);
    const content = toContent(removeExtension(local));
    const reactJS = await toReactJS(componentName, svg);
    const reactTS = toReactTS(reactJS);
    const vueJS = toVueJS(svg);
    const vueTS = toVueTS(svg);

    return {
      content: {
        original: {
          api: {
            content,
          },
          components: {
            react: {
              js: reactJS,
              ts: reactTS,
            },
            vue: {
              js: vueJS,
              ts: vueTS,
            },
          },
          snippets: {
            css,
            jsx,
            svg,
          },
        },
      },
      file: {
        camel: componentName,
        snake: removeExtension(name),
      },
      version: getVersion(name),
    };
  };
} as any as { new (): Constructor })();
