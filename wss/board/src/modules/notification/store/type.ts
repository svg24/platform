import type { Store } from 'types/notification';

export function initType(this: Store): void {
  this.type = {
    value: {
      _default: null,
      current: null,
    },
    set(value) {
      this.value.current = value;
    },
    reset() {
      this.value.current = this.value._default;
    },
  };
}
