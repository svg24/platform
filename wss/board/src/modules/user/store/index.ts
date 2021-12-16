import type { Store } from 'types/user';
import { initContent } from './content';
import { initDocument } from './document';

export const UserStore = new (function (this: Store) {
  initContent.call(this);
  initDocument.call(this);
} as any as { new (): Store })();
