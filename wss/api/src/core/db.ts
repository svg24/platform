import child from 'child_process';
import { promises as fs } from 'fs';
import util from 'util';
import mongoose from 'mongoose';
import { toCamelCaseFromSvg } from 'src/utils';
import type { DB, DBContent } from 'types/db';

export const db = new (function (this: DB) {
  this.opts = {
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

  this.getContent = async (id) => {
    try {
      const root = `/srv/db/packages/vanilla/${id}`;
      const dirents = await fs.readdir(root, { withFileTypes: true });
      const content: DBContent = [];

      await Promise.all(dirents.map(async (dirent) => {
        if (dirent.isSymbolicLink()) return;

        const buf = await fs.readFile(`${root}/${dirent.name}`);
        const name = toCamelCaseFromSvg(dirent.name);

        content.push({
          packages: {
            react: `import { ${name} } from '@svg24/react';`,
            vue: `import { ${name} } from '@svg24/vue';`,
          },
          snippets: {
            vanilla: buf.toString(),
          },
        });
      }));

      return content;
    } catch (err) {
      console.error(err);
      return [];
    }
  };
} as any as { new (): DB })();
