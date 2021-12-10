import { initStoreFormParameter } from 'src/utils';
import type { SettingsStore } from 'types/settings';

export function initRoot(this: SettingsStore): void {
  const normal = {
    id: 'normal',
    name: 'Normal',
  };

  Object.defineProperty(this, 'size', {
    enumerable: true,
    value: {
      id: 'size',
      options: [{
        id: 'small',
        name: 'Small',
      }, normal, {
        id: 'big',
        name: 'Big',
      }],
      value: {
        _default: normal,
        _current: normal,
      },
    },
  });

  initStoreFormParameter.call(this.size);
}
