import { compile } from '@vue/compiler-dom';

export function toVueJS(preview: string, html: string): string {
  return compile(html, { mode: 'module' }).code
    .replace('export', `${preview}export`);
}
