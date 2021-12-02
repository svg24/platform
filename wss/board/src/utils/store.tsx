import { createContext, useContext } from 'react';
import type { ReactElement } from 'react';
import type { Store } from 'types/store';

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
