import type { Store } from 'types/notification';
import { initDescription } from './description';
import { initRoot } from './root';
import { initType } from './type';

export const NotificationStore = new (function NotificationStore(this: Store) {
  initRoot.call(this);
  initType.call(this);
  initDescription.call(this);
} as any as { new (): Store })();
