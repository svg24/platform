import { reaction } from 'mobx';
import { useEffect, useRef, useState } from 'react';
import { Transition } from 'src/components';
import { useStore } from 'src/store';

function BagRoot({ children }: { children: JSX.Element[] }): JSX.Element {
  const { bag, layout } = useStore();
  const rootRef = useRef<HTMLDivElement>(null);
  const [bagIsVisible, setBagIsVisible] = useState(false);

  function handleClose(): void {
    layout.bag.hide();
    if (layout.bag.goBack) layout.bag.goBack();
  }
  function handleClick(ev: MouseEvent): void {
    if (ev.target === rootRef.current) handleClose();
  }
  function handleFocusout(ev: FocusEvent): void {
    if (!ev.relatedTarget) return;
    if (!rootRef.current?.contains(ev.relatedTarget as Node)) handleClose();
  }

  useEffect(() => {
    rootRef.current?.focus();
    rootRef.current?.addEventListener('click', handleClick);
    rootRef.current?.addEventListener('focusout', handleFocusout);
  }, [bagIsVisible]);

  reaction(() => layout.bag.isVisible, () => {
    if (layout.bag.isVisible) {
      setBagIsVisible(true);
    } else {
      setBagIsVisible(false);
    }
  });

  return (
    <Transition
      classNames="bag-root"
      isVisible={bagIsVisible}
    >
      <div
        aria-label={`${bag.item.meta?.name} details`}
        className="bag-root"
        ref={rootRef}
        role="presentation"
        tabIndex={-1}
      >
        <div className="bag-root__inner">
          {children}
        </div>
      </div>
    </Transition>
  );
}

export { BagRoot };
