import type { DocumentStore } from '@svg24/www/src/types/doc';

export function initDoc(this: DocumentStore): void {
  const el = document.documentElement;

  Object.assign(this, {
    fix(): void {
      el.classList.add('doc_fixed');
    },

    unFix(): void {
      el.classList.remove('doc_fixed');
    },

    get isFixed(): boolean {
      return el.classList.contains('doc_fixed');
    },

    touch(): void {
      el.classList.add('doc_touch');
    },
  });
}

export default {
  initDoc,
};
