import { reaction } from 'mobx';
import type { MutableRefObject } from 'react';
import { forwardRef, useEffect } from 'react';
import { Spin } from 'src/components';
import { LogosStore } from '../../store';

export const LogosSentinel = forwardRef<HTMLDivElement>((_, ref) => {
  const { ctx } = LogosStore;

  const root = {
    get ls() {
      return (ref as MutableRefObject<HTMLDivElement | null>)
        .current?.classList;
    },
    mount() {
      useEffect(() => {
        root.toggleHidden();
        reaction(() => ctx.meta.page.isNext, root.toggleHidden);
        reaction(() => ctx.sentinel.isVisible, root.toggleVisible);
      }, []);
    },
    toggleHidden() {
      if (ctx.meta.page.isNext) {
        root.ls?.remove('logos-sentinel_hidden');
      } else {
        root.ls?.add('logos-sentinel_hidden');
      }
    },
    toggleVisible() {
      if (ctx.sentinel.isVisible) {
        root.ls?.add('logos-sentinel_visible');
      } else {
        root.ls?.remove('logos-sentinel_visible');
      }
    },
  };

  root.mount();

  return (
    <div
      className="logos-sentinel"
      ref={ref}
    >
      <Spin className="logos-sentinel__icon" />
      <span>
        Loading more...
      </span>
    </div>
  );
});
