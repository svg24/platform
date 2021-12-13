import { initStore } from 'src/utils';
import type { UserStore as Store } from 'types/user';

export const UserStore = new (function (this: Store) {
  initStore.call(this);

  this.multiplier = undefined;
  this.document = {
    _fontSize: parseInt(
      window.getComputedStyle(document.documentElement).fontSize,
      10,
    ),
    toRem(value) {
      return value * this._fontSize;
    },
  };
} as any as { new (): Store })();
