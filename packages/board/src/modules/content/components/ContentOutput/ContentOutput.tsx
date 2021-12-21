function ContentOutput({ children }: { children: JSX.Element[] }): JSX.Element {
  return (
    <output
      className="content-output"
      form="search"
    >
      {children}
    </output>
  );
}

export { ContentOutput };
