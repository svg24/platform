import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { Store, StoreIsVisible } from 'types/notification';

export function initRoot(this: Store): void {
  this._isVisible = false;
  Object.defineProperty(this, 'isVisible', {
    configurable: true,
    enumerable: true,
    get: () => this._isVisible,
    set: (value: StoreIsVisible) => {
      this._isVisible = value;
    },
  });

  this.show = () => {
    this.isVisible = true;
    setTimeout(() => {
      this.hide();
    }, 2000);
  };
  this.hide = () => {
    this.type.reset();
    this.description.reset();
    this.isVisible = false;
  };
  this.showNegative = (value) => {
    if (!(
      this.isVisible
      && this.type.isNegative
      && value === this.description.value.current
    )) {
      this.type.setNegative();
      this.description.set(value);
      this.show();
    }
  };
  this.showPositive = (value) => {
    if (!(
      this.isVisible
      && this.type.isPositive
      && value === this.description.value.current
    )) {
      this.type.setPositive();
      this.description.set(value);
      this.show();
    }
  };

  makeObservable(this, {
    _isVisible: observable,
    isVisible: computed,
    show: action,
    hide: action,
  });
}
