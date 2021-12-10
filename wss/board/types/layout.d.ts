import type { Store, StoreVisible } from 'types/store';

export interface LayoutStore extends Store<LayoutStore> {
  bag: LayoutStoreBag;
  main: LayoutStoreMain;
}

interface LayoutStoreBag extends StoreVisible {
  goBack: (() => void) | null;
}

type LayoutStoreMain = {
  content: LayoutStoreMainContent;
  filter: LayoutStoreMainFilter;
};
type LayoutStoreMainContent = {
  goTop: (() => void) | null;
};
interface LayoutStoreMainFilter extends StoreVisible {
  toggle: () => void;
}
