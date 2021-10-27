import fs from 'fs';
import { server, Server } from '../core';

export class Home {
  #opts = {
    infoFile: '/srv/db/info.json',
  }

  opts = {}

  plugin = async (inst: typeof server.inst): Promise<void> => {
    this.#regHome(inst);
  }

  #regHome(inst: typeof server.inst): void {
    inst.route({
      method: 'GET',
      url: '/',
      schema: {
        response: {
          200: {
            type: 'object',
          },
        },
      },
      handler: async (): Promise<unknown|undefined> => {
        try {
          const content = await fs.promises.readFile(this.#opts.infoFile);

          return Server.beatifyBody(JSON.parse(content.toString()));
        } catch (err) {
          console.error(err);

          return undefined;
        }
      },
    });
  }
}

export default new Home();
