import type { ComponentProps } from 'react';
import { createElement } from 'react';

export function LayoutHeaderButton(
  props: ComponentProps<'button'>,
): JSX.Element {
  return createElement('button', {
    className: 'layout-header__button',
    type: 'button',
    ...props,
  });
}
