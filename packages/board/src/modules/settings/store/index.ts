import type { Store } from 'types/settings';
import { initSize } from './size';

export const SettingsStore = new (function SettingsStore(this: Store) {
  initSize.call(this);
} as any as { new (): Store })();
