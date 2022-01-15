import type { RefObject } from 'react';
import { useEffect, useRef } from 'react';
import { Store } from 'src/store';
import { Portal } from '../Portal';
import { Transition } from '../Transition';

export function Popper({
  anchorRef,
  children,
  isVisible,
  onClose,
}: {
  anchorRef: RefObject<HTMLElement>;
  children: JSX.Element;
  isVisible: boolean;
  onClose(): void;
}): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);

  function setOffset(): void {
    const { current } = rootRef;
    const anchorRect = anchorRef.current?.getBoundingClientRect();

    if (current && anchorRect) {
      const pdRem = Store.user.document.toRem(0.25);

      if (
        Math.round(anchorRect.bottom + current.clientHeight)
        <= document.documentElement.clientHeight
      ) {
        current.style.top = `${Math.round(anchorRect.bottom + pdRem)}px`;
      } else {
        current.style.bottom = `${Math.round(anchorRect.top + pdRem)}px`;
      }

      if (
        Math.round(anchorRect.left + current.clientWidth)
        <= document.documentElement.clientWidth
      ) {
        current.style.left = `${Math.round(anchorRect.left)}px`;
      } else {
        const right = document.documentElement.clientWidth - anchorRect.right;
        current.style.right = `${Math.round(right)}px`;
      }
    }
  }

  function setFocus(): void {
    rootRef.current?.focus();
    rootRef.current?.addEventListener('focusout', (ev: FocusEvent) => {
      if (!rootRef.current?.contains(ev.relatedTarget as Node)) onClose();
    });
  }

  useEffect(() => {
    if (!isVisible) return;
    setOffset();
    setFocus();
  }, [isVisible]);

  return (
    <Portal>
      <Transition
        classNames="popper"
        isVisible={isVisible}
        ms={100}
      >
        <div
          className="popper"
          ref={rootRef}
          tabIndex={-1}
        >
          <div className="popper__content">
            {children}
          </div>
        </div>
      </Transition>
    </Portal>
  );
}
