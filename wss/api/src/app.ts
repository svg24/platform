import { Server } from 'http';
import Koa from 'koa';
import { APP } from './constants/app';
import router from './routes';

const app = new Koa()
  .use(router.routes())
  .use(router.allowedMethods());

export const listen = (): Server => app.listen(APP.PORT, () => {
  console.log(`api: listening on port ${APP.PORT}`);
});

export default app;
