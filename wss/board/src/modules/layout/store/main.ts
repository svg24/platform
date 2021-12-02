import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { LayoutStore } from 'types/layout';

export const initMain = function (this: LayoutStore): void {
  this.main = {
    content: {
      ref: undefined,
      gotoTop() {
        if (this.ref?.current) this.ref.current.scrollTop = 0;
      },
    },
    filter: {
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
      toggle: () => {
        if (this.main.filter.isVisible) {
          this.main.filter.hide();
        } else {
          this.main.filter.show();
        }
      },
    },
  };

  makeObservable(this.main.filter, {
    _isVisible: observable,
    isVisible: computed,
    show: action,
    hide: action,
  });
};
