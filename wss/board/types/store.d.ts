import type { Store as BagStore } from './bag';
import type { Store as ContentStore } from './content';
import type { Store as FilterStore } from './filter';
import type { Store as LayoutStore } from './layout';
import type { Store as SearchStore } from './search';
import type { Store as SettingsStore } from './settings';
import type { Store as UserStore } from './user';

declare namespace Store {
  const bag: BagStore;
  const content: ContentStore;
  const filter: FilterStore;
  const layout: LayoutStore;
  const search: SearchStore;
  const settings: SettingsStore;
  const user: UserStore;

  type Visible = {
    _isVisible: VisibleIsVisible;
    hide: () => void;
    isVisible: VisibleIsVisible;
    show: () => void;
  };
  type VisibleIsVisible = boolean;

  interface FormParameter<Options, Option extends FormParameterOptionsItem> {
    id: string;
    options: Options | undefined;
    reset: () => void;
    set: (option: Option) => void;
    value: FormParameterValue<Option>;
  }

  type FormParameterOptions = FormParameterOptionsItem[];
  type FormParameterOptionsItem = {
    id: string;
    name: string;
  };

  type FormParameterValue<Option extends FormParameterOptionsItem> = {
    _current: Option | undefined;
    _default: Option | undefined;
    checkIsCurrent: (id: Option['id']) => boolean;
    current: Option | undefined;
  };
}

export = Store;
