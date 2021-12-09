import type { ContentStore } from 'types/content';
import { initListData } from './data';
import { initListMeta } from './meta';
import { initListRoot } from './root';

export function initList(this: ContentStore): void {
  initListRoot.call(this);
  initListData.call(this);
  initListMeta.call(this);
}
