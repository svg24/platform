import type { RefObject } from 'react';
import type { Store } from 'src/types/store';

export interface LayoutStore extends Store<LayoutStore> {
  nav: LayoutElementTransitions;
  root: LayoutRoot;
  sidebar: LayoutStoreSidebar;
}

/**
 * nav
 */

export type LayoutElementTransitions = {
  _isVisible: boolean;
  hide: () => void;
  isVisible: LayoutElementTransitions['_isVisible'];
  show: () => void;
};

/**
 * root
 */

export type LayoutRoot = {
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
