import type { Store } from 'types/user';

export function initContent(this: Store): void {
  this.content = {
    list: {
      multiplier: {
        value: {
          _default: 1,
          current: 1,
        },
        get isApplied() {
          return this.value.current !== this.value._default;
        },
      },
    },
  };
}
