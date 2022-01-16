import type { ComponentProps } from 'react';
import { createElement, forwardRef } from 'react';

export const LayoutHeaderButton = (
  forwardRef<HTMLButtonElement, ComponentProps<'button'>>((props, ref) => (
    createElement('button', {
      ref,
      className: 'layout-header__button',
      type: 'button',
      ...props,
    })))
);
