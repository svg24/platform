import type { LayoutStore } from 'types/layout';

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
