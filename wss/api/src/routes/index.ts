import Router from '@koa/router';
import { DB_FILES, ROUTER_PATHS } from '../constants';
import readJson from '../utils/read-json';

const router = new Router();

router.get(ROUTER_PATHS.HOME, (ctx) => {
  ctx.body = readJson(DB_FILES.INFO);
});

export default router;
