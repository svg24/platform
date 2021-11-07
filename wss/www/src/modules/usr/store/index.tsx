import type { UserStore as Store } from 'src/types/usr';
import { initUsr } from './usr';

const UsrStore = function (this: Store) {
  initUsr.call(this);
} as any as { new (): Store };

export default new UsrStore();
