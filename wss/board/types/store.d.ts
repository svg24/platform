import type { Context, ReactElement } from 'react';

export interface Store<T> extends Object {
  readonly Provider: (args: { children: ReactElement }) => JSX.Element;
  readonly _ctx: Context<T>;
  readonly ctx: T;
}

export type StoreVisible = {
  _isVisible: StoreVisibleIsVisible;
  hide: () => void;
  isVisible: StoreVisibleIsVisible;
  show: () => void;
};
type StoreVisibleIsVisible = boolean;
