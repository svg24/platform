export interface Store<T> extends Object {
  readonly _ctx: React.Context<T>;
  readonly ctx: T;
  readonly provider: ({ children }: { children: React.ReactElement }) => (
    JSX.Element
  );
}
