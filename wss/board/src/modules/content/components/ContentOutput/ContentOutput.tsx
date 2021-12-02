export const ContentOutput = ({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element => (
  <output
    className="content-output"
    form="search"
  >
    {children}
  </output>
);
