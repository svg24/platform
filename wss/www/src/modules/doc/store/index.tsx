import type { DocStore as Store } from '@svg24/www/src/types/doc';
import base from './base';
import doc from './doc';

const Inst = function DocStore(this: Store) {
  base.init.call(this);
  doc.init.call(this);
} as any as { new (): Store };

export default new Inst();
