import type { ComponentProps } from 'react';
import { createElement } from 'react';

export function List(props: ComponentProps<'ul'>): JSX.Element {
  return createElement('ul', {
    className: 'list',
    ...props,
  });
}

export function ListItem(props: ComponentProps<'li'>): JSX.Element {
  return createElement('li', {
    className: 'list__item',
    ...props,
  });
}
