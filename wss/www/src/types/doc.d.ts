import type { Store } from './store';

export interface DocStore extends Store<DocStore> {
  _el: HTMLElement;
  fix: () => void;
  isFixed: boolean;
  touch: () => void;
  unFix: () => void;
}
