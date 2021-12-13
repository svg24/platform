import type { Store } from 'types/store';

export interface UserStore extends Store<UserStore> {
  document: UserStoreDocument;
  multiplier: number | undefined;
}

type UserStoreDocument = {
  _fontSize: number;
  toRem: (value: number) => number;
};
