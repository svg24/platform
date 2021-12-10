import type { ComponentProps } from 'react';
import { createElement } from 'react';

export function Logo(props: ComponentProps<'img'>): JSX.Element {
  return createElement('img', {
    alt: 'Logo',
    src: 'https://raw.githubusercontent.com/svg24/.github/main/logo.svg',
    ...props,
  });
}
