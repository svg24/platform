import { initSettingsParameter } from 'src/utils';
import type { Store } from 'types/settings';

const auto = {
  id: 'auto',
  name: 'Auto',
  index: 2,
};

export function initFilter(this: Store): void {
  Object.defineProperty(this, 'filter', {
    enumerable: true,
    value: {
      id: 'filter',
      options: {
        auto,
        hidden: {
          id: 'hidden',
          name: 'Hidden',
          index: 1,
        },
        visible: {
          id: 'visible',
          name: 'Visible',
          index: 3,
        },
      },
      value: {
        _default: auto,
      },
    },
  });
  initSettingsParameter.call(this.filter);
}
