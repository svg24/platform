import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { ContentStore } from 'types/content';

export function initSentinel(this: ContentStore): void {
  this.sentinel = {
    _isVisible: false,
    get isVisible() {
      return this._isVisible;
    },
    set isVisible(val) {
      this._isVisible = val;
    },
    show() {
      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    },
  };

  makeObservable(this.sentinel, {
    _isVisible: observable,
    isVisible: computed,
    show: action,
    hide: action,
  });
}
