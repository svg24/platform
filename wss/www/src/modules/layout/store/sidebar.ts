import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { LayoutStore } from '../types';

export const initSidebar = function (this: LayoutStore): void {
  this.sidebar = {
    initiator: undefined,
    _isVisible: false,
    get isVisible() {
      return this._isVisible;
    },
    set isVisible(val: boolean) {
      this._isVisible = val;
    },
    show() {
      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    },
  };

  makeObservable(this.sidebar, {
    _isVisible: observable,
    isVisible: computed,
    show: action,
    hide: action,
  });
};
