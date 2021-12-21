import child from 'child_process';
import util from 'util';
import mongoose from 'mongoose';
import type DataBase from 'types/db';

export const db = new (function (this: typeof DataBase) {
  Object.defineProperty(this, 'options', {
    enumerable: true,
    value: {
      local: '/srv/db/packages/vanilla/',
      name: process.env.DB_NAME,
      pass: process.env.DB_PASS,
      uri: `mongodb://db:${process.env.DB_PORT}/?authSource=admin`,
      user: process.env.DB_USER,
    },
  });

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
            --username ${this.options.user} \
            --password ${this.options.pass} \
            --db ${this.options.name} \
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
      await mongoose.connect(this.options.uri, {
        dbName: this.options.name,
        user: this.options.user,
        pass: this.options.pass,
      });
      await this.init();
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        this.connect();
      }, 3000);
    }
  };
} as any as { new (): typeof DataBase })();