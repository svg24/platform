import type { SimpleModule } from 'types/simple';

export function initOpts(this: SimpleModule, prefix: string): void {
  this.opts = { prefix };
}
