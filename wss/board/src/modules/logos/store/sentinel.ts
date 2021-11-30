import type { LogosStore } from 'types/modules/logos';

export function initSentinel(this: LogosStore): void {
  this.sentinel = {
    ref: undefined,
    show() {
      this.ref?.current?.classList.add('logos-sentinel_visible');
    },
    hide() {
      this.ref?.current?.classList.remove('logos-sentinel_visible');
    },
  };
}
