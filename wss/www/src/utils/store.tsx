import { createContext, useContext } from 'react';
import type { ReactElement } from 'react';
import type { Store } from '../types/store';

export function initBase<I extends Store<I>>(this: I): void {
  Object.defineProperties(this, {
    _ctx: {
      value: createContext<I | null>(null),
      enumerable: true,
    },
    ctx: {
      get: () => useContext(this._ctx),
      enumerable: true,
    },
    provider: {
      value: ({ children }: { children: ReactElement }) => (
        <this._ctx.Provider value={this}>
          {children}
        </this._ctx.Provider>
      ),
      enumerable: true,
    },
  });
}

export default {
  initBase,
};
