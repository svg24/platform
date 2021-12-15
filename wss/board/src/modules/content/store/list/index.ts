import type { Store } from 'types/content';
import { initListResult } from './result';
import { initListRoot } from './root';

export function initList(this: Store): void {
  initListRoot.call(this);
  initListResult.call(this);
}
