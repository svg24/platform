import type { UserStore } from 'types/user';

export function initContent(this: UserStore): void {
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
