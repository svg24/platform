export function FilterRoot({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <form className="filter-root">
      {children}
    </form>
  );
}
