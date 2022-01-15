export function toVueTS(html: string): string {
  const importTypes = 'import type { RenderFunction } from \'vue\';';
  const propTypes = '_cache): RenderFunction';

  return `${importTypes}\n\n${html.replace('_cache)', propTypes)}`;
}
