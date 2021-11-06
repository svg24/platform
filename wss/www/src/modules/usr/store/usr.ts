import type { UserStore } from 'src/types/usr';

export function initUsr(this: UserStore): void {
  Object.assign(this, {
    get isTouch(): boolean {
      return !!window.ontouchstart || navigator.maxTouchPoints > 0;
    },
  });
}
