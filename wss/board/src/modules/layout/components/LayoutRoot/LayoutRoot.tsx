export function LayoutRoot({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element {
  return (
    <div className="layout-root">
      {children}
    </div>
  );
}
