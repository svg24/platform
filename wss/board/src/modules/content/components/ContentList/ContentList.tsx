export const ContentList = ({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element => (
  <ol className="content-list content-list_base">
    {children}
  </ol>
);
