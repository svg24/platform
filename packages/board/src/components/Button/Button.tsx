import type { ComponentProps } from 'react';
import { createElement } from 'react';

export function Button(props: ComponentProps<'button'>): JSX.Element {
  return createElement('button', {
    className: 'button',
    type: 'button',
    ...props,
  });
}
