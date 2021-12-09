import { initStore } from 'src/utils';
import type { UserStore as Store } from 'types/user';

export const UserStore = new (function (this: Store) {
  initStore.call(this);

  this.multiplier = undefined;
} as any as { new (): Store })();
