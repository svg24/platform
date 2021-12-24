import type { ComponentProps } from 'react';
import { createElement } from 'react';

export function Logo(props: ComponentProps<'img'>): JSX.Element {
  return createElement('img', {
    alt: 'Logo',
    src: '/assets/images/logo.svg',
    ...props,
  });
}
