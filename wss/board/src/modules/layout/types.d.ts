import type { RefObject } from 'react';
import type { Store } from 'src/types/store';

export interface LayoutStore extends Store<LayoutStore> {
  nav: LayoutStoreNav;
  root: LayoutStoreRoot;
  sidebar: LayoutStoreSidebar;
}

/**
 * Nav
 */

type LayoutStoreNav = {
  _isVisible: boolean;
  hide: () => void;
  isVisible: LayoutStoreNav['_isVisible'];
  show: () => void;
};

/**
 * Root
 */

type LayoutStoreRoot = {
  nav: {
    hide: () => Promise<void>;
    show: () => void;
    toggle: () => void;
  };
  ref: RefObject<HTMLDivElement> | undefined;
  sidebar: {
    hide: () => void;
    show: () => void;
  };
};

/**
 * Sidebar
 */

type LayoutStoreSidebar = {
  _isVisible: boolean;
  hide: () => void;
  initiator: HTMLButtonElement | undefined | null;
  isVisible: LayoutStoreSidebar['_isVisible'];
  show: () => void;
};
