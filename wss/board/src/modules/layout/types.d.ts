import type { RefObject } from 'react';
import type { Store } from 'src/types/store';

export interface LayoutStore extends Store<LayoutStore> {
  main: LayoutStoreMain;
  root: LayoutStoreRoot;
  sidebar: LayoutStoreSidebar;
}

/**
 * Main
 */

type LayoutStoreMain = {
  content: {
    gotoTop: () => void;
    ref: RefObject<HTMLDivElement> | undefined;
  };
  filter: {
    _isVisible: boolean;
    hide: () => void;
    isVisible: LayoutStoreMain['filter']['_isVisible'];
    show: () => void;
  };
};

/**
 * Root
 */

type LayoutStoreRoot = {
  filter: {
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
