import type { Store, StoreVisible } from 'types/store';

export interface LayoutStore extends Store<LayoutStore> {
  bag: LayoutStoreBag;
  main: LayoutStoreMain;
}

interface LayoutStoreBag extends StoreVisible {
  back: () => void;
}

type LayoutStoreMain = {
  content: {
    toTop: () => void;
  };
  filter: LayoutStoreMainFilter;
};

interface LayoutStoreMainFilter extends StoreVisible {
  toggle: () => void;
}
