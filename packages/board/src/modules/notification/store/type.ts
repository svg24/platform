import type { Store } from 'types/notification';

export function initType(this: Store): void {
  this.type = {
    value: {
      _default: null,
      current: null,
    },
    setNegative() {
      this.value.current = 'negative';
    },
    get isNegative() {
      return this.value.current === 'negative';
    },
    setPositive() {
      this.value.current = 'positive';
    },
    get isPositive() {
      return this.value.current === 'positive';
    },
    reset() {
      this.value.current = this.value._default;
    },
  };
}
