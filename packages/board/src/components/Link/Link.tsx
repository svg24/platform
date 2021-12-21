import type { ComponentProps } from 'react';
import { createElement } from 'react';

export function Link(props: ComponentProps<'link'>): JSX.Element {
  return createElement('a', {
    className: 'link',
    ...props,
  });
}
