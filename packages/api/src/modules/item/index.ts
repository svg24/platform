import { promises as fs } from 'fs';
import type TItem from 'types/item';
import { db } from '../../core';
import {
  removeExtension,
  toCSS,
  toComponentName,
  toJSX,
  toReactJS,
  toReactTS,
  toURL,
  toVueJS,
} from '../../utils';
import { addRoute } from './route';

export const item = new (function Item(this: typeof TItem) {
  Object.defineProperty(this, 'options', {
    enumerable: true,
    value: {
      prefix: 'item',
    },
  });
  this.plugin = async (inst) => {
    addRoute.call(this, inst);
  };

  this.getData = async (id) => {
    const root = `${db.options.local}${id}`;
    const dirents = await fs.readdir(root, { withFileTypes: true });
    const data = [] as TItem.RouteResponseData;

    await Promise.all(dirents.map(async (dirent) => {
      if (!dirent.isSymbolicLink()) {
        data.push(await this.getDataItem(id, dirent.name));
      }
    }));

    return data;
  };
  this.getDataItem = async (id, name) => {
    const component = toComponentName(name);
    return {
      content: await this.getDataItemContent(`${id}/${name}`, component),
      file: this.getDataItemFile(name, component),
      version: await this.getDataItemVersion(name),
    };
  };
  this.getDataItemContent = async (path, component) => {
    const buf = await fs.readFile(`${db.options.local}${path}`);
    const original = {
      components: {
        react: {
          get js() { return toReactJS(component, original.snippets.jsx); },
          get ts() { return toReactTS(component, original.snippets.jsx); },
        },
        vue: {
          get js() { return toVueJS(component, original.snippets.svg); },
        },
      },
      links: {
        url: toURL(removeExtension(path)),
      },
      snippets: {
        css: toCSS(buf.toString('base64')),
        get jsx() { return toJSX(original.snippets.svg); },
        svg: buf.toString(),
      },
    };
    return { original };
  };
  this.getDataItemFile = (name, component) => ({
    camel: component,
    snake: removeExtension(name),
  });
  this.getDataItemVersion = async (name) => {
    const match = name.match(/.+-v(.*).svg/);
    return match && match[1] ? (new Date(match[1])).getTime() : 0;
  };
} as any as { new (): typeof TItem })();
