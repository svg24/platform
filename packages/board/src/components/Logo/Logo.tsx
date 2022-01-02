import type { ComponentProps } from 'react';
import { createElement } from 'react';

export function Logo(props: ComponentProps<'img'>): JSX.Element {
  return createElement('img', {
    alt: 'Logo',
    src: 'https://assets.svg24.dev/images/logo.svg',
    ...props,
  });
}
