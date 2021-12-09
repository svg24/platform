import type { Store } from 'types/store';

export interface SearchStore extends Store<SearchStore> {
  process: (val: string) => void;
  reset: () => void;
  val: {
    _field: string;
    _prev: string | undefined;
    cur: string | undefined;
    field: SearchStore['val']['_field'];
  };
}
