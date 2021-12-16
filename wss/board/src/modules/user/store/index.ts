import type { Store } from 'types/user';
import { initContent } from './content';

export const UserStore = new (function (this: Store) {
  initContent.call(this);

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
