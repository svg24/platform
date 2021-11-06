import type { DocumentStore as Store } from '@svg24/www/src/types/doc';
import { initBase } from '@svg24/www/src/utils/store';
import { initDoc } from './doc';

const Inst = function DocumentStore(this: Store) {
  initBase.call(this);
  initDoc.call(this);
} as any as { new (): Store };

export default new Inst();
