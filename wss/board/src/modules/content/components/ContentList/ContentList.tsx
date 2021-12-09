export function ContentList({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element {
  return (
    <ol className="content-list content-list_base">
      {children}
    </ol>
  );
}
