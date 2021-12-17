import { Children, cloneElement, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export function Transition({
  children,
  classNames,
  isVisible,
  ms,
}: {
  children: JSX.Element;
  classNames: string;
  isVisible: boolean;
  ms?: number;
}): JSX.Element {
  const ref = useRef(null);

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
      nodeRef={ref}
      timeout={ms || 300}
      unmountOnExit
    >
      {cloneElement(Children.only(children), { ref })}
    </CSSTransition>
  );
}

Transition.defaultProps = {
  ms: undefined,
};
