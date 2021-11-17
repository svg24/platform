import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { LayoutStore } from '../types';

export const initNav = function (this: LayoutStore): void {
  this.nav = {
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

  makeObservable(this.nav, {
    _isVisible: observable,
    isVisible: computed,
    show: action,
    hide: action,
  });
};
