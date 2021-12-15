import { useEffect, useRef } from 'react';
import { useStore } from 'src/store';

export function BagRoot({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element {
  const { bag, layout } = useStore();

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
      layout.bag.hide();
      if (layout.bag.goBack) layout.bag.goBack();
    },
  };

  root.mount();

  return (
    <div
      aria-label={`${bag.item.meta?.name} details`}
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
