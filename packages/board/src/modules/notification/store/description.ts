import type { Store } from 'types/notification';

export function initDescription(this: Store): void {
  this.description = {
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
