import { useRef } from 'react';
import { LayoutStore } from '../../store';

export const LayoutRoot = (
  { children }: { children: JSX.Element[] },
): JSX.Element => {
  const { ctx } = LayoutStore;
  ctx.root.ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="layout-root"
      ref={ctx.root.ref}
    >
      {children}
    </div>
  );
};
