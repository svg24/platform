import type { ContentStore } from 'types/content';
import { initListResult } from './result';
import { initListRoot } from './root';

export function initList(this: ContentStore): void {
  initListRoot.call(this);
  initListResult.call(this);
}
