import { compile } from '@vue/compiler-dom';

export function toVueJS(html: string): string {
  const res = compile(html, { mode: 'module' });
  return res.code;
}
