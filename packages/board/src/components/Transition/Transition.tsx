import type { RefObject } from 'react';
import {
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';
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
  const transitionClassNames = {
    enter: `${classNames}_enter`,
    enterActive: `${classNames}_active-enter`,
    enterDone: `${classNames}_done-enter`,
    exit: `${classNames}_exit`,
    exitActive: `${classNames}_active-exit`,
    exitDone: `${classNames}_done-exit`,
  };
  const { enterDone, exit } = transitionClassNames;
  const [isMountedVisible, setIsMountedVisible] = useState(false);

  useEffect(() => {
    if (rootRef?.current && isVisible) {
      rootRef.current.classList.add(enterDone);
      setIsMountedVisible(true);
    }
  }, []);

  useEffect(() => {
    if (rootRef?.current && isMountedVisible) {
      if (
        !isVisible
        && rootRef.current.classList.contains(enterDone)
        && rootRef.current.classList.contains(exit)
      ) {
        rootRef.current.classList.remove(enterDone);
        setIsMountedVisible(false);
      }
    }
  });

  return (
    <CSSTransition
      classNames={transitionClassNames}
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
