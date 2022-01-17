import type { Store } from 'types/settings';
import { initFilter } from './filter';
import { initRoot } from './root';
import { initSize } from './size';

export const SettingsStore = new (function SettingsStore(this: Store) {
  initRoot.call(this);
  initFilter.call(this);
  initSize.call(this);
} as any as { new (): Store })();
