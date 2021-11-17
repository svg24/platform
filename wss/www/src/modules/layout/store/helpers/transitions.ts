import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { LayoutStore } from '../../types';

type ElementTransitions = 'nav' | 'sidebar';

export function initElementTransitions(
  this: LayoutStore,
  el: ElementTransitions,
): void {
  this[el] = {
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

  makeObservable(this[el], {
    _isVisible: observable,
    isVisible: computed,
    show: action,
    hide: action,
  });
}
