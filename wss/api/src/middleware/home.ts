import { RouterContext } from '@koa/router';
import { DB_FILE_NAMES } from '../constants/db';
import { readJson } from '../utils';

export default (ctx: RouterContext): void => {
  ctx.body = readJson(DB_FILE_NAMES.INFO);
};
