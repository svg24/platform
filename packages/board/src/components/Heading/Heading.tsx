import type { ComponentProps } from 'react';
import { createElement } from 'react';

export function HeadingLevel3(props: ComponentProps<'h3'>): JSX.Element {
  return createElement('h3', {
    className: 'heading heading_l3',
    ...props,
  });
}
