import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import type { SettingsParameter } from 'types/settings';

export function initSettingsParameter(this: SettingsParameter): void {
  this.value = {
    _default: this.value._default,
    _current: this.value._default,
    checkIsCurrent(id) {
      return this.current?.id === id;
    },
    get current() {
      return this._current;
    },
    set current(value) {
      this._current = value;
    },
  };

  this.fetch = function fetch() {
    const id = localStorage.getItem(this.id);
    this.value.current = id
      ? this.options[id] || this.value._default
      : this.value._default;
  };
  this.set = function set(option) {
    if (option.id === this.value._default?.id) {
      this.reset();
    } else {
      localStorage.setItem(this.id, option.id);
      this.value.current = option;
    }
  };
  this.reset = function reset() {
    localStorage.removeItem(this.id);
    this.value.current = this.value._default;
  };

  makeObservable(this, {
    fetch: action,
    reset: action,
    set: action,
  });
  makeObservable(this.value, {
    _current: observable,
    current: computed,
  });
}
