import {
  action,
  computed,
  makeObservable,
  observable,
} from 'mobx';
import { createContext, useContext } from 'react';
import type { ReactElement } from 'react';
import type { Store, StoreVisible } from 'types/store';

export function initStore<I extends Store<I>>(this: I): void {
  Object.defineProperties(this, {
    _ctx: {
      value: createContext<I | null>(null),
      enumerable: true,
    },
    ctx: {
      get: () => useContext(this._ctx),
      enumerable: true,
    },
    Provider: {
      value: ({ children }: { children: ReactElement }) => (
        <this._ctx.Provider value={this}>
          {children}
        </this._ctx.Provider>
      ),
      enumerable: true,
    },
  });
}

export function initStoreVisible<I extends StoreVisible>(this: I): void {
  this._isVisible = false;

  Object.defineProperties(this, {
    isVisible: {
      get: () => this._isVisible,
      set(value) {
        this._isVisible = value;
      },
      enumerable: true,
      configurable: true,
    },
  });

  this.show = function () {
    this.isVisible = true;
  };
  this.hide = function () {
    this.isVisible = false;
  };

  makeObservable(this, {
    _isVisible: observable,
    isVisible: computed,
    show: action,
    hide: action,
  });
}
