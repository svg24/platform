import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { LayoutStore } from 'types/layout';

export const initBag = function (this: LayoutStore): void {
  this.bag = {
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
    back: () => {},
  };

  makeObservable(this.bag, {
    _isVisible: observable,
    isVisible: computed,
    show: action,
    hide: action,
  });
};
