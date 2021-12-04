import { db, server } from './core';
import * as modules from './modules';

db.connect();
server.listen();

Object.values(modules).forEach((module) => {
  server.inst.register(module.plugin, {
    ...module.opts,
    prefix: `v1/${module.opts.prefix}`,
  });
});
