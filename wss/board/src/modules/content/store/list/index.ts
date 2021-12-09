import type { ContentStore } from 'types/content';
import { initResult } from './result';
import { initListRoot } from './root';

export function initList(this: ContentStore): void {
  initListRoot.call(this);
  initResult.call(this);
}
