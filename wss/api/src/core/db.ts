import child from 'child_process';
import { promises as fs } from 'fs';
import util from 'util';
import mongoose from 'mongoose';
import type { DB } from 'types/db';
import type { ItemData } from 'types/item';
import * as utils from '../utils';

export const db = new (function (this: DB) {
  this.opts = {
    local: '/srv/db/packages/vanilla/',
    name: process.env.DB_NAME,
    pass: process.env.DB_PASS,
    uri: `mongodb://db:${process.env.DB_PORT}/?authSource=admin`,
    user: process.env.DB_USER,
  };

  this.init = async () => {
    try {
      await Promise.all([
        'categories.json',
        'companies.json',
        'logos.json',
      ].map(async (file) => {
        await util.promisify(child.exec)(`
          mongoimport \
            --host db \
            --authenticationDatabase admin \
            --username ${this.opts.user} \
            --password ${this.opts.pass} \
            --db ${this.opts.name} \
            --collection ${file.replace('.json', '')} \
            --file /srv/db/data/${file} \
            --drop;
        `);
      }));
    } catch (err) {
      console.error(err);
      process.exit(0);
    }
  };

  this.connect = async () => {
    try {
      await mongoose.connect(this.opts.uri, {
        dbName: this.opts.name,
        user: this.opts.user,
        pass: this.opts.pass,
      });
      await this.init();
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        this.connect();
      }, 3000);
    }
  };

  this.modules = {
    list: {
      async getDataItem(id) {
        return {
          isMany: await this.getDataItemIsMany(id),
          latest: await this.getDataItemLatest(id),
        };
      },
      getDataItemIsMany: async (id) => {
        const dirents = await fs.readdir(`${this.opts.local}${id}`, {
          withFileTypes: true,
        });
        return dirents.filter((dirent) => !dirent.isSymbolicLink()).length > 1;
      },
      getDataItemLatest: async (id) => {
        const buf = await fs.readFile(`${this.opts.local}${id}/${id}.svg`);
        return buf.toString();
      },
    },
    item: {
      getData: async (id) => {
        const root = `${this.opts.local}${id}`;
        const dirents = await fs.readdir(root, { withFileTypes: true });
        const data = [] as ItemData;

        await Promise.all(dirents.map(async (dirent) => {
          if (!dirent.isSymbolicLink()) {
            data.push(await this.modules.item.getDataItem(id, dirent.name));
          }
        }));

        return data;
      },
      async getDataItem(id, direntName) {
        const componentName = utils.toComponentName(direntName);

        return {
          content: await this.getDataItemContent(`${id}/${direntName}`, componentName),
          file: this.getDataItemFile(direntName, componentName),
          version: await this.getDataItemVersion(direntName),
        };
      },
      getDataItemContent: async (path, componentName) => {
        const buf = await fs.readFile(`${this.opts.local}${path}`);

        const original = {
          components: {
            react: {
              get js() {
                return utils.toReactJS(componentName, original.snippets.jsx);
              },
              get ts() {
                return utils.toReactTS(componentName, original.snippets.jsx);
              },
            },
            vue: {
              get js() {
                return utils.toVueJS(componentName, original.snippets.svg);
              },
            },
          },
          links: {
            url: utils.toURL(utils.removeExtension(path)),
          },
          packages: {
            react: utils.toReactPackage(componentName),
            vue: utils.toVuePackage(componentName),
          },
          snippets: {
            css: utils.toCSS(buf.toString('base64')),
            get jsx() {
              return utils.toJSX(original.snippets.svg);
            },
            svg: buf.toString(),
          },
        };

        return { original };
      },
      getDataItemFile(direntName, componentName) {
        return {
          camel: componentName,
          snake: utils.removeExtension(direntName),
        };
      },
      async getDataItemVersion(direntName) {
        const match = direntName.match(/.+-v(.*).svg/);
        return match && match[1] ? (new Date(match[1])).getTime() : 0;
      },
    },
    content: {
      get: async (id, name) => {
        const buf = await fs.readFile(`${this.opts.local}/${id}/${name}.svg`);
        return buf.toString();
      },
    },
  };
} as any as { new (): DB })();
