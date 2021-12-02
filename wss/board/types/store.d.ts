export interface Store<T> extends Object {
  readonly Provider: ({ children }: { children: React.ReactElement }) => (
    JSX.Element
  );
  readonly _ctx: React.Context<T>;
  readonly ctx: T;
}

export type StoreVisible = {
  _isVisible: boolean;
  hide: () => void;
  isVisible: StoreVisible['_isVisible'];
  show: () => void;
};
