import type { Store as BagStore } from './bag';
import type { Store as ContentStore } from './content';
import type { Store as FilterStore } from './filter';
import type { LayoutStore } from './layout';
import type { SearchStore } from './search';
import type { SettingsStore } from './settings';
import type { UserStore } from './user';

export interface Store {
  bag: BagStore;
  content: ContentStore;
  filter: FilterStore;
  layout: LayoutStore;
  search: SearchStore;
  settings: SettingsStore;
  user: UserStore;
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
