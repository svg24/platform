import { initSettingsParameter } from 'src/utils';
import type { Store } from 'types/settings';

const normal = {
  id: 'normal',
  name: 'Normal',
  index: 2,
};

export function initSize(this: Store): void {
  Object.defineProperty(this, 'size', {
    enumerable: true,
    value: {
      id: 'size',
      options: {
        normal,
        small: {
          id: 'small',
          name: 'Small',
          index: 1,
        },
        big: {
          id: 'big',
          name: 'Big',
          index: 2,
        },
      },
      value: {
        _default: normal,
      },
    },
  });
  initSettingsParameter.call(this.size);
}
