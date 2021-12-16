import type { ReactPortal } from 'react';
import { createPortal } from 'react-dom';

export function Portal(props: {
  children: JSX.Element;
}): ReactPortal {
  return createPortal(props.children, document.body);
}
