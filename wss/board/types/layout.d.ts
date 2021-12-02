import type { Store, StoreVisible } from 'types/store';

export interface LayoutStore extends Store<LayoutStore> {
  main: LayoutStoreMain;
  sidebar: LayoutStoreSidebar;
}

type LayoutStoreMain = {
  content?: {
    gotoTop: (() => void);
  };
  filter: LayoutStoreMainFilter;
};

interface LayoutStoreMainFilter extends StoreVisible {
  toggle: () => void;
}

interface LayoutStoreSidebar extends StoreVisible {
  initiator: HTMLButtonElement | undefined | null;
}
