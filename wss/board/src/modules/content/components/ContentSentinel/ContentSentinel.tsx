import { reaction } from 'mobx';
import type { MutableRefObject } from 'react';
import { forwardRef, useEffect } from 'react';
import { Spin } from 'src/components';
import { useStore } from 'src/store';

export const ContentSentinel = forwardRef<HTMLDivElement>((_, ref) => {
  const { content } = useStore();

  const root = {
    get ls() {
      return (ref as MutableRefObject<HTMLDivElement | null>)
        .current?.classList;
    },
    mount() {
      useEffect(() => {
        root.toggleHidden();
        reaction(() => content.list.result.meta.page.isNext, root.toggleHidden);
        reaction(() => content.sentinel.isVisible, root.toggleVisible);
      }, []);
    },
    toggleHidden() {
      if (content.list.result.meta.page.isNext) {
        root.ls?.remove('content-sentinel_hidden');
      } else {
        root.ls?.add('content-sentinel_hidden');
      }
    },
    toggleVisible() {
      if (content.sentinel.isVisible) {
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
