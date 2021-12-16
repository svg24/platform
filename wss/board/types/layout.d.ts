import type { Visible } from 'types/store';

declare namespace Layout {
  /**
   * `layout`
   */
  type Store = {
    bag: StoreBag;
    main: StoreMain;
  };
  /**
   * `layout.bag`
   */
  interface StoreBag extends Visible {
    goBack: (() => void) | null;
  }
  /**
   * `layout.main`
   */
  type StoreMain = {
    content: StoreMainContent;
    filter: StoreMainFilter;
  };
  type StoreMainContent = {
    goTop: (() => void) | null;
  };
  interface StoreMainFilter extends Visible {
    toggle: () => void;
  }
}

export = Layout;
