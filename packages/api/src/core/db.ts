import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { promisify } from 'util';
import mongoose from 'mongoose';
import type { Constructor } from 'types/database';

export const db = new (function Database(this: Constructor) {
  this.options = {
    data: process.env.DATABASE_DATA,
    logos: process.env.DATABASE_LOGOS,
    name: process.env.DATABASE_NAME,
    pass: process.env.DATABASE_PASS,
    uri: `mongodb://db:${process.env.DATABASE_PORT}/?authSource=admin`,
    user: process.env.DATABASE_USER,
  };

  this.init = async () => {
    try {
      const data = await fs.readdir(this.options.data);
      await Promise.all(data.map(async (file) => {
        await promisify(exec)(`
          mongoimport \
            --host db \
            --authenticationDatabase admin \
            --username ${this.options.user} \
            --password ${this.options.pass} \
            --db ${this.options.name} \
            --collection ${file.replace('.json', '')} \
            --file ${this.options.data}/${file} \
            --drop;
        `);
      }));
    } catch (err) {
      throw new Error(err as string);
    }
  };

  this.connect = async () => {
    try {
      await mongoose.connect(this.options.uri, {
        dbName: this.options.name,
        user: this.options.user,
        pass: this.options.pass,
      });
    } catch (err) {
      throw new Error(err as string);
    }
  };
} as any as { new (): Constructor })();
