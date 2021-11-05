import type { DocStore } from '@svg24/www/src/types/doc';
import { createContext, useContext } from 'react';
import type { ReactElement } from 'react';

export function init(this: DocStore): void {
  Object.defineProperties(this, {
    _ctx: {
      value: createContext<DocStore | null>(null),
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
  init,
};
