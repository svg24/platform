import type { LayoutStore } from 'types/modules/layout';

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
    filter: {
      show: () => {
        tmp.ls?.add('layout-root_filter-display');
        tmp.ls?.add('layout-root_filter-in');
        setTimeout(() => {
          tmp.ls?.remove('layout-root_filter-in');
        }, tmp.ms);
      },
      hide: () => (
        new Promise((resolve) => {
          tmp.ls?.add('layout-root_filter-out');
          setTimeout(() => {
            tmp.ls?.remove('layout-root_filter-out');
            tmp.ls?.remove('layout-root_filter-display');
            resolve();
          }, tmp.ms);
        })
      ),
      toggle: () => {
        if (this.main.filter.isVisible) {
          this.root.filter.hide().then(() => {
            this.main.filter.hide();
          });
        } else {
          this.main.filter.show();
          this.root.filter.show();
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
