import { reaction } from 'mobx';
import type { MutableRefObject } from 'react';
import { forwardRef, useEffect } from 'react';
import { Spin } from 'src/components';
import { ContentStore } from '../../store';

export const ContentSentinel = forwardRef<HTMLDivElement>((_, ref) => {
  const { ctx } = ContentStore;

  const root = {
    get ls() {
      return (ref as MutableRefObject<HTMLDivElement | null>)
        .current?.classList;
    },
    mount() {
      useEffect(() => {
        root.toggleHidden();
        reaction(() => ctx.list.result.meta.page.isNext, root.toggleHidden);
        reaction(() => ctx.sentinel.isVisible, root.toggleVisible);
      }, []);
    },
    toggleHidden() {
      if (ctx.list.result.meta.page.isNext) {
        root.ls?.remove('content-sentinel_hidden');
      } else {
        root.ls?.add('content-sentinel_hidden');
      }
    },
    toggleVisible() {
      if (ctx.sentinel.isVisible) {
        root.ls?.add('content-sentinel_visible');
      } else {
        root.ls?.remove('content-sentinel_visible');
      }
    },
  };

  root.mount();

  return (
    <div
      className="content-sentinel"
      ref={ref}
    >
      <Spin className="content-sentinel__icon" />
      <span>
        Loading more...
      </span>
    </div>
  );
});
