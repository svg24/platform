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
  };

  function toggleHidden(): void {
    if (content.list.response.meta.page.isNext) {
      root.ls?.remove('content-sentinel_hidden');
    } else {
      root.ls?.add('content-sentinel_hidden');
    }
  }
  function toggleVisible(): void {
    if (content.sentinel.isVisible) {
      root.ls?.add('content-sentinel_visible');
    } else {
      root.ls?.remove('content-sentinel_visible');
    }
  }

  useEffect(() => {
    toggleHidden();
    reaction(() => content.list.response.meta.page.isNext, toggleHidden);
    reaction(() => content.sentinel.isVisible, toggleVisible);
  }, []);

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
