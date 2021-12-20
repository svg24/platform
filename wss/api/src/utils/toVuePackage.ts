export function toVuePackage(name: string): string {
  return `import { ${name} } from '@svg24/vue';`;
}
