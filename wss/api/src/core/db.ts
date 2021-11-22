import child from 'child_process';
import fs from 'fs';
import mongoose from 'mongoose';
import util from 'util';

export class DB {
  opts = {
    uri: `mongodb://db:${process.env.DB_PORT}/?authSource=admin`,
    col: process.env.DB_COLLECTION.replace('.json', ''),
    file: process.env.DB_COLLECTION,
    name: process.env.DB_NAME,
    pass: process.env.DB_PASS,
    user: process.env.DB_USER,
  }

  async connect(): Promise<void> {
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
  }

  async init(): Promise<void> {
    try {
      await util.promisify(child.exec)(`
        mongoimport \
          --host db \
          --authenticationDatabase admin \
          --username ${this.opts.user} \
          --password ${this.opts.pass} \
          --db ${this.opts.name} \
          --collection ${this.opts.col} \
          --file /srv/db/${this.opts.file} \
          --drop;
      `);
    } catch (err) {
      console.error(err);
      process.exit(0);
    }
  }

  static async getContent(slug: string): Promise<string[] | void> {
    try {
      const root = `/srv/db/packages/vanilla/${slug}`;
      const items = await fs.promises.readdir(root);
      const content = await Promise.all(items.map(async (item) => {
        const buf = await fs.promises.readFile(`${root}/${item}`);

        return buf.toString();
      }));

      return content;
    } catch (err) {
      console.log(err);

      return undefined;
    }
  }
}

export default new DB();
