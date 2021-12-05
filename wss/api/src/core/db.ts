import child from 'child_process';
import { promises as fs } from 'fs';
import util from 'util';
import mongoose from 'mongoose';
import type { DB } from 'types/db';
import type { ItemData } from 'types/item';
import * as utils from '../utils';

export const db = new (function (this: DB) {
  this.opts = {
    name: process.env.DB_NAME,
    pass: process.env.DB_PASS,
    src: '/srv/db/packages/vanilla/',
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

  this.list = {
    async getDataItem(id) {
      return {
        isMany: await this.getDataItemIsMany(id),
        latest: await this.getDataItemLatest(id),
      };
    },
    getDataItemIsMany: async (id) => {
      const dirents = await fs.readdir(`${this.opts.src}${id}`, {
        withFileTypes: true,
      });
      return dirents.filter((dirent) => !dirent.isSymbolicLink()).length > 1;
    },
    getDataItemLatest: async (id) => {
      const buf = await fs.readFile(`${this.opts.src}${id}/${id}.svg`);
      return buf.toString();
    },
  };

  this.item = {
    getData: async (id) => {
      const root = `${this.opts.src}${id}`;
      const dirents = await fs.readdir(root, { withFileTypes: true });
      const data = [] as ItemData;

      await Promise.all(dirents.map(async (dirent) => {
        if (!dirent.isSymbolicLink()) {
          data.push(await this.item.getDataItem(id, dirent.name));
        }
      }));

      return data;
    },
    async getDataItem(id, name) {
      return {
        content: await this.getDataItemContent(id, name),
        version: await this.getDataItemVersion(id),
      };
    },
    getDataItemContent: async (id, direntName) => {
      const buf = await fs.readFile(`${this.opts.src}${id}/${direntName}`);
      const name = utils.toComponentName(direntName);

      const content = {
        components: {
          js: {
            get react() {
              return utils.toJSReact(name, content.snippets.jsx);
            },
            get vue() {
              return utils.toJSVue(name, content.snippets.svg);
            },
          },
          ts: {
            get react() {
              return utils.toTSReact(name, content.snippets.jsx);
            },
          },
        },
        links: {
          url: `https://api.svg24.dev/item?id=${id}`,
        },
        packages: {
          react: utils.toReactPackage(name),
          vue: utils.toVuePackage(name),
        },
        snippets: {
          css: utils.toCSS(buf.toString('base64')),
          get jsx() {
            return utils.toJSX(content.snippets.svg);
          },
          svg: buf.toString(),
        },
      };

      return content;
    },
    async getDataItemVersion(id) {
      const match = id.match(/.+-v(.*).svg/);
      const date = match && match[1] ? (new Date(match[1])).getTime() : 0;

      return { date, type: 'squared' };
    },
  };
} as any as { new (): DB })();
