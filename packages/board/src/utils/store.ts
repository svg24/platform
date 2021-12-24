import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type {
  FormParameter,
  FormParameterOptionsItem,
  Visible,
} from 'types/store';

export function initStoreVisible<I extends Visible>(this: I): void {
  this._isVisible = false;

  Object.defineProperty(this, 'isVisible', {
    enumerable: true,
    configurable: true,
    get: () => this._isVisible,
    set(value) {
      this._isVisible = value;
    },
  });

  this.show = function show() {
    this.isVisible = true;
  };
  this.hide = function hide() {
    this.isVisible = false;
  };

  makeObservable(this, {
    _isVisible: observable,
    isVisible: computed,
    show: action,
    hide: action,
  });
}

export function initStoreFormParameter<
  I extends FormParameter<any, FormParameterOptionsItem>>(
  this: I,
): void {
  Object.defineProperty(this.value, 'current', {
    configurable: true,
    enumerable: true,
    get: () => this.value._current,
    set: (value: typeof this.value._current) => {
      this.value._current = value;
    },
  });

  this.value.checkIsCurrent = function checkIsCurrent(id) {
    return this.current?.id === id;
  };

  this.set = function set(option) {
    this.value.current = option;
  };
  this.reset = function reset() {
    this.value.current = this.value._default;
  };

  makeObservable(this, {
    set: action,
    reset: action,
  });
  makeObservable(this.value, {
    _current: observable,
    current: computed,
  });
}
