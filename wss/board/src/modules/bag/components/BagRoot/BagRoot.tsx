import { useEffect, useRef } from 'react';
import { useStore } from 'src/store';

export function BagRoot({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element {
  const { bag, layout } = useStore();
  const ref = useRef<HTMLDivElement>(null);

  function handleClose(): void {
    layout.bag.hide();
    if (layout.bag.goBack) layout.bag.goBack();
  }
  function handleClick(ev: MouseEvent): void {
    if (ev.target === ref.current) handleClose();
  }
  function handleFocusout(ev: FocusEvent): void {
    if (!ev.relatedTarget) return;
    if (!ref.current?.contains(ev.relatedTarget as Node)) handleClose();
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
      ref.current.addEventListener('click', handleClick);
      ref.current.addEventListener('focusout', handleFocusout);
    }
  }, []);

  return (
    <div
      aria-label={`${bag.item.meta?.name} details`}
      className="bag-root"
      ref={ref}
      role="dialog"
      tabIndex={-1}
    >
      <div className="bag-root__inner">
        {children}
      </div>
    </div>
  );
}
