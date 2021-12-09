import { useEffect, useRef } from 'react';
import { LayoutStore } from 'src/modules/layout';
import { BagStore } from '../../store';

export function BagRoot({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element {
  const layoutCtx = LayoutStore.ctx;
  const bagCtx = BagStore.ctx;

  const root = {
    ref: useRef<HTMLDivElement>(null),
    mount() {
      useEffect(() => {
        if (root.ref.current) {
          root.ref.current.focus();
          root.ref.current.addEventListener('click', root.click);
          root.ref.current.addEventListener('focusout', root.focusout);
        }
      }, []);
    },
    click(ev: MouseEvent) {
      if (ev.target === root.ref.current) root.close();
    },
    focusout: (ev: FocusEvent) => {
      if (!ev.relatedTarget) return;
      if (!root.ref.current?.contains(ev.relatedTarget as Node)) root.close();
    },
    close() {
      layoutCtx.bag.hide();
      if (layoutCtx.bag.goBack) layoutCtx.bag.goBack();
    },
  };

  root.mount();

  return (
    <div
      aria-label={`${bagCtx.item.meta?.name} details`}
      className="bag-root"
      ref={root.ref}
      role="dialog"
      tabIndex={-1}
    >
      <div className="bag-root__inner">
        {children}
      </div>
    </div>
  );
}
