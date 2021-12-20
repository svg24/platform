import { reaction } from 'mobx';
import { forwardRef, useRef } from 'react';
import { Spin } from 'src/components';
import { useStore } from 'src/store';
import { useForkRef } from 'src/utils';

export const ContentSentinel = forwardRef<HTMLDivElement>((_, ref) => {
  const { content } = useStore();
  const localRef = useRef<HTMLDivElement>(null);
  const foreignRef = useForkRef(localRef, ref);

  reaction(() => content.list.response.meta.page.hasNext, () => {
    if (content.list.response.meta.page.hasNext) {
      localRef.current?.classList.remove('content-sentinel_hidden');
    } else {
      localRef.current?.classList.add('content-sentinel_hidden');
    }
  });
  reaction(() => content.sentinel.isVisible, () => {
    if (content.sentinel.isVisible) {
      localRef.current?.classList.add('content-sentinel_visible');
    } else {
      localRef.current?.classList.remove('content-sentinel_visible');
    }
  });

  return (
    <div
      className="content-sentinel"
      ref={foreignRef}
    >
      <Spin className="content-sentinel__icon" />
      <span>
        Loading more...
      </span>
    </div>
  );
});
