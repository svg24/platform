export function toReactPackage(name: string): string {
  return `import { ${name} } from '@svg24/react';`;
}
