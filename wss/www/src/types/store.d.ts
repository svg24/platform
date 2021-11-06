export interface Store<T> extends Object {
  readonly Provider: ({ children }: { children: React.ReactElement }) => (
    JSX.Element
  );
  readonly _ctx: React.Context<T>;
  readonly ctx: T;
}
