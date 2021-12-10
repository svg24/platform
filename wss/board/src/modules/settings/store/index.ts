import { initStore } from 'src/utils';
import type { SettingsStore as Store } from 'types/settings';
import { initRoot } from './root';

export const SettingsStore = new (function (this: Store) {
  initStore.call(this);
  initRoot.call(this);
} as any as { new (): Store })();
