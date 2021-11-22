import type { LayoutStore } from '../types';

export const initRoot = function (this: LayoutStore): void {
  const tmp: {
    readonly ls: DOMTokenList | undefined;
    readonly ms: number;
  } = Object.create(null, {
    ls: {
      get: () => this.root.ref?.current?.classList,
      enumerable: true,
    },
    ms: {
      value: 300,
    },
  });

  this.root = {
    ref: undefined,
    nav: {
      show: () => {
        tmp.ls?.add('layout-root_nav-display');
        tmp.ls?.add('layout-root_nav-in');
        setTimeout(() => {
          tmp.ls?.remove('layout-root_nav-in');
        }, tmp.ms);
      },
      hide: () => (
        new Promise((resolve) => {
          tmp.ls?.add('layout-root_nav-out');
          setTimeout(() => {
            tmp.ls?.remove('layout-root_nav-out');
            tmp.ls?.remove('layout-root_nav-display');
            resolve();
          }, tmp.ms);
        })
      ),
      toggle: () => {
        if (this.nav.isVisible) {
          this.root.nav.hide().then(() => {
            this.nav.hide();
          });
        } else {
          this.nav.show();
          this.root.nav.show();
        }
      },
    },
    sidebar: {
      show: () => {
        this.sidebar.show();
        tmp.ls?.add('layout-root_sidebar-display');
        tmp.ls?.add('layout-root_sidebar-in');
        setTimeout(() => {
          tmp.ls?.remove('layout-root_sidebar-in');
        }, tmp.ms);
      },
      hide: () => {
        tmp.ls?.add('layout-root_sidebar-out');
        setTimeout(() => {
          tmp.ls?.remove('layout-root_sidebar-out');
          tmp.ls?.remove('layout-root_sidebar-display');
          this.sidebar.hide();
        }, tmp.ms);
      },
    },
  };
};
