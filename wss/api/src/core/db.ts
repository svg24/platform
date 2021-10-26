import child from 'child_process';
import fs from 'fs';
import mongoose from 'mongoose';
import util from 'util';

export class DB {
  #opts = {
    uri: `mongodb://db:${process.env.DB_PORT}/?authSource=admin`,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  }

  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.#opts.uri, {
        dbName: this.#opts.name,
        user: this.#opts.user,
        pass: this.#opts.pass,
      });
      DB.#init();
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        this.connect();
      }, 3000);
    }
  }

  static async #init(): Promise<void> {
    try {
      await util.promisify(child.exec)('sh /srv/db/init.sh');
    } catch (err) {
      console.error(err);
      process.exit(0);
    }
  }

  static async getContent(col: string, slug: string): Promise<string[] | void> {
    try {
      const root = `/srv/db/${col}/items/${slug}`;
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
