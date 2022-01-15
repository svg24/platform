import { promises as fs } from 'fs';
import type {
  Constructor,
  RouteResponseDataItem,
  RouteResponseDataItemMetaVersion,
} from 'types/item';
import { db } from '../../core';
import {
  getPreview,
  getVersionAndType,
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
    const local = `${db.options.logos}/${id}`;
    const files = await fs.readdir(local);
    const sorted = {} as {
      [key: RouteResponseDataItemMetaVersion]: RouteResponseDataItem;
    };

    await Promise.all(files.map(async (file) => {
      const fileName = removeExtension(file);
      const { type, version } = getVersionAndType(fileName);

      if (type && version) {
        const componentName = toComponentName(fileName);
        const buf = await fs.readFile(`${local}/${file}`);
        const svg = buf.toString();
        const css = toCSS(buf);
        const jsx = toJSX(svg);
        const content = toContent(`${id}/${fileName}`);
        const preview = getPreview(componentName, svg);
        const reactJS = await toReactJS(preview, componentName, svg);
        const reactTS = toReactTS(reactJS);
        const vueJS = toVueJS(preview, svg);
        const vueTS = toVueTS(vueJS);

        sorted[version] = {
          data: {
            ...sorted[version]?.data,
            [type]: {
              data: {
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
              meta: {
                componentName,
                fileName,
              },
            },
          },
          meta: {
            version,
          },
        };
      }
    }));

    return Object.values(sorted);
  };
} as any as { new (): Constructor })();
