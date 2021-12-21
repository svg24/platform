import type { RefObject } from 'react';
import { cloneElement, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useForkRef } from 'src/utils';

export function Transition({
  children,
  classNames,
  isVisible,
  ms,
  rootRef,
}: {
  children: any;
  classNames: string;
  isVisible: boolean;
  ms?: number;
  rootRef?: RefObject<HTMLElement>;
}): JSX.Element {
  const localRef = useRef(null);
  const foreignRef = useForkRef(children.ref, localRef);
  const handleRef = useForkRef(foreignRef, localRef);

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
      {cloneElement(children, { ref: handleRef })}
    </CSSTransition>
  );
}

Transition.defaultProps = {
  ms: undefined,
  rootRef: undefined,
};
