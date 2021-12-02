import { forwardRef } from 'react';

export const LayoutRoot = forwardRef<HTMLDivElement, {
  children: JSX.Element[];
}>(({
  children,
}, ref) => (
  <div
    className="layout-root"
    ref={ref}
  >
    {children}
  </div>
));
