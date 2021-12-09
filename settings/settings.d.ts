import type { Store } from 'types/store';

export interface OptionsStore extends Store<OptionsStore> {
  size: OptionsStoreSize;
}

type OptionsStoreSize = {
  // id: string;
  readonly isActive: boolean;
  legend: string;
  onChange: (val: string) => void;
  opts: {
    name: string;
    val: string;
  }[];
  reset: () => void;
  val: {
    _cur: string;
    readonly _def: string;
    cur: OptionsStoreSize['val']['_cur'];
  };
};
