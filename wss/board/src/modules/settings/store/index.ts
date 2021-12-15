import type { SettingsStore as Store } from 'types/settings';
import { initRoot } from './root';

export const SettingsStore = new (function (this: Store) {
  initRoot.call(this);
} as any as { new (): Store })();
