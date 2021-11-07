import type { DocumentStore as Store } from 'src/types/doc';
import { initBase } from 'src/utils';
import { initDoc } from './doc';

const DocStore = function (this: Store) {
  initBase.call(this);
  initDoc.call(this);
} as any as { new (): Store };

export default new DocStore();
