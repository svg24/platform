import { db, server } from './core';
import * as modules from './modules';

async function main(): Promise<void> {
  await db.connect();
  await db.init();
  server.listen();
  Object.values(modules).forEach((module) => {
    server.inst.register(module.plugin, {
      ...module.options,
      prefix: `v1/${module.options.prefix}`,
    });
  });
}

main();
