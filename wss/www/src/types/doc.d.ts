import type { Store } from './store';

export interface DocumentStore extends Store<DocumentStore> {
  _el: HTMLElement;
  fix: () => void;
  isFixed: boolean;
  touch: () => void;
  unFix: () => void;
}
