import type { Store } from 'types/store';

export interface SearchStore extends Store<SearchStore> {
  process: (value: string) => void;
  reset: () => void;
  value: {
    _default: null;
    _previous: SearchStore['value']['current'];
    current: string | SearchStore['value']['_default'];
  };
}
