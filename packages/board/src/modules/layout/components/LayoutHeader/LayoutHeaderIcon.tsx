import type { ComponentProps } from 'react';

export function LayoutHeaderIcon({
  icon,
}: {
  icon(props: ComponentProps<'svg'>): JSX.Element;
}): JSX.Element {
  return icon({ className: 'layout-header__icon' });
}
