import type { DocStore as Store } from '@svg24/www/src/types/doc';
import { initBase } from '@svg24/www/src/utils/store';
import doc from './doc';

const Inst = function DocStore(this: Store) {
  initBase.call(this);
  doc.init.call(this);
} as any as { new (): Store };

export default new Inst();
