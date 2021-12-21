import { initStoreFormParameter } from 'src/utils';
import type { Store } from 'types/settings';

const normal = {
  id: 'normal',
  name: 'Normal',
};

export function initSize(this: Store): void {
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
