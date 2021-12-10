import type { ComponentProps } from 'react';
import { createElement } from 'react';

export function PseudoLink(props: ComponentProps<'button'>): JSX.Element {
  return createElement('button', {
    className: 'pseudo-link',
    type: 'button',
    ...props,
  });
}
