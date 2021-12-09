import type { Store } from 'types/store';

export interface UserStore extends Store<UserStore> {
  multiplier: number | undefined;
}
