import babel from '@babel/core';
import { transform } from '@svgr/core';

async function toReactJS(componentName: string, html: string): Promise<string> {
  const component = await transform(html, { ref: true }, { componentName });
  const res = await babel.transformAsync(component, {
    plugins: [['@babel/plugin-transform-react-jsx', { useBuiltIns: true }]],
  });

  if (res && res.code) {
    res.code
      .replace('import * as React', 'import { createElement, forwardRef }')
      .replace('React.', '')
      .replace('export default ForwardRef;', '')
      .replace('const', 'export const');
  }

  return '';
}

export { toReactJS };
