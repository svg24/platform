import Koa from 'koa';
import router from './routes';

export default new Koa()
  .use(router.routes())
  .use(router.allowedMethods());
