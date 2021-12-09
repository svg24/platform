import type { Content } from 'types/content';

export function initRoot(this: Content): void {
  this.opts = {
    prefix: 'content',
  };
}
