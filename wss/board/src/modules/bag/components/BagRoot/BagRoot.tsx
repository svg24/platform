import { forwardRef, useEffect, useRef } from 'react';
import { useStore } from 'src/store';
import { useForkRef } from 'src/utils/useForkRef';

export const BagRoot = (
  forwardRef<HTMLDivElement, { children: JSX.Element[] }>((props, ref) => {
    const { bag, layout } = useStore();
    const localRef = useRef<HTMLDivElement>(null);
    const foreignRef = useForkRef(localRef, ref);

    function handleClose(): void {
      layout.bag.hide();
      if (layout.bag.goBack) layout.bag.goBack();
    }
    function handleClick(ev: MouseEvent): void {
      if (ev.target === localRef.current) handleClose();
    }
    function handleFocusout(ev: FocusEvent): void {
      if (!ev.relatedTarget) return;
      if (!localRef.current?.contains(ev.relatedTarget as Node)) handleClose();
    }

    useEffect(() => {
      localRef.current?.focus();
      localRef.current?.addEventListener('click', handleClick);
      localRef.current?.addEventListener('focusout', handleFocusout);
    }, []);

    return (
      <div
        aria-label={`${bag.item.meta?.name} details`}
        className="bag-root"
        ref={foreignRef}
        role="presentation"
        tabIndex={-1}
      >
        <div className="bag-root__inner">
          {props.children}
        </div>
      </div>
    );
  })
);
