import type { StoreVisible } from 'types/store';

export interface LayoutStore {
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
