import type { SimpleModule } from './types';

export function initOpts(this: SimpleModule, prefix: string): void {
  this.opts = { prefix };
}
