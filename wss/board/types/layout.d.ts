import type { Store, StoreVisible } from 'types/store';

export interface LayoutStore extends Store<LayoutStore> {
  bag: LayoutStoreBag;
  main: LayoutStoreMain;
}

interface LayoutStoreBag extends StoreVisible {
  goBack: (() => void) | null;
}

type LayoutStoreMain = {
  content: {
    goTop: (() => void) | null;
  };
  filter: LayoutStoreMainFilter;
};

interface LayoutStoreMainFilter extends StoreVisible {
  toggle: () => void;
}
