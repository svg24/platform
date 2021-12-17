import type { RefObject } from 'react';
import { cloneElement, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export function Transition({
  children,
  classNames,
  isVisible,
  ms,
  rootRef,
}: {
  children: JSX.Element;
  classNames: string;
  isVisible: boolean;
  ms?: number;
  rootRef: RefObject<HTMLElement>;
}): JSX.Element {
  const localRef = useRef(null);

  return (
    <CSSTransition
      classNames={{
        enter: `${classNames}_enter`,
        enterActive: `${classNames}_active-enter`,
        enterDone: `${classNames}_done-enter`,
        exit: `${classNames}_exit`,
        exitActive: `${classNames}_active-exit`,
        exitDone: `${classNames}_done-exit`,
      }}
      in={isVisible}
      nodeRef={rootRef || localRef}
      timeout={ms || 300}
      unmountOnExit
    >
      {cloneElement(children, { ref: localRef })}
    </CSSTransition>
  );
}

Transition.defaultProps = {
  ms: undefined,
};
