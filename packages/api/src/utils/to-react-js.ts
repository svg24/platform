import babel from '@babel/core';
import { transform } from '@svgr/core';

export async function toReactJS(
  preview: string,
  componentName: string,
  html: string,
): Promise<string> {
  const component = await transform(html, { ref: true }, { componentName });
  const res = await babel.transformAsync(component, {
    plugins: [['@babel/plugin-transform-react-jsx', { useBuiltIns: true }]],
  });

  return res && res.code
    ? res.code
      .replace('import * as React', 'import { createElement, forwardRef }')
      .replace('import { forwardRef } from "react";\n', '')
      .replaceAll('React.', '')
      .replaceAll(componentName, `${componentName}Render`)
      .replace('export default ForwardRef;', '')
      .replace('const ForwardRef', `${preview}export const ${componentName}`)
    : '';
}
