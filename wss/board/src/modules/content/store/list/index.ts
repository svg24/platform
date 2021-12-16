import type { Store } from 'types/content';
import { initListResponse } from './response';
import { initListRoot } from './root';

export function initList(this: Store): void {
  initListRoot.call(this);
  initListResponse.call(this);
}
