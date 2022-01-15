export function toVueTS(vueJS: string): string {
  const importTypes = 'import type { RenderFunction } from \'vue\';';
  const propTypes = '_cache): RenderFunction';

  return `${importTypes}\n${vueJS.replace('_cache)', propTypes)}`;
}
