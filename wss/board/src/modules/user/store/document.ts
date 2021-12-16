import type { Store } from 'types/user';

export function initDocument(this: Store): void {
  this.document = {
    _fontSize: parseInt(
      window.getComputedStyle(document.documentElement).fontSize,
      10,
    ),
    toRem(value) {
      return value * this._fontSize;
    },
  };
}
