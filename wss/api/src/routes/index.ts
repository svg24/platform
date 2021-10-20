import Router from '@koa/router';
import { APP_ROUTER_PATHS } from '../constants/app';
import home from '../middleware/home';
import * as logos from '../middleware/logos';

export default new Router()
  .get(APP_ROUTER_PATHS.HOME, home)
  .get(APP_ROUTER_PATHS.LOGOS, logos.list);
