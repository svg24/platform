export const LogosOutput = (
  { children }: { children: JSX.Element[] },
): JSX.Element => (
  <output
    className="logos-output"
    form="search"
  >
    {children}
  </output>
);
