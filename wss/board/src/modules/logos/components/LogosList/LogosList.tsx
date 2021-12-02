export const LogosList = ({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element => (
  <ol className="logos-list logos-list_base">
    {children}
  </ol>
);
