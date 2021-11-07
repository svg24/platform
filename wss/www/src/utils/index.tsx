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

export const debounce = (
  <F extends (...args: any[]) => any>(fn: F, ms: number): any => {
    let timeout: NodeJS.Timeout;

    return (...args: Parameters<F>): Promise<ReturnType<F>> => (
      new Promise((resolve) => {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
          resolve(fn(...args));
        }, ms);
      })
    );
  }
);

export const escapeStr = (str: string): string => (
  JSON.stringify(str).slice(1, -1).replace(/\s+/g, ' ')
);

export const delay = (ms: number): Promise<unknown> => (
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
);

export const deepObjectAssign = (target: unknown, ...sources: any[]): any => {
  sources.forEach((source) => {
    const props = Object.keys(source).reduce((descriptors, key) => {
      Object.assign(descriptors, {
        [key]: Object.getOwnPropertyDescriptor(source, key),
      });

      return descriptors;
    }, {});

    Object.defineProperties(target, props);
  });

  return target;
};
