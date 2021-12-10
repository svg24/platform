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

export interface StoreFormParameter<
  Options,
  Option extends StoreFormParameterOptionsItem> {
  id: string;
  options: Options | undefined;
  reset: () => void;
  set: (option: Option) => void;
  value: StoreFormParameterValue<Option>;
}

type StoreFormParameterOptions = StoreFormParameterOptionsItem[];
export type StoreFormParameterOptionsItem = {
  id: string;
  name: string;
};

type StoreFormParameterValue<Option extends StoreFormParameterOptionsItem> = {
  _current: Option | undefined;
  _default: Option | undefined;
  checkIsCurrent: (id: Option['id']) => boolean;
  current: Option | undefined;
};
