import type { Store } from 'types/settings';
import { initSize } from './size';

export const SettingsStore = new (function (this: Store) {
  initSize.call(this);
} as any as { new (): Store })();
