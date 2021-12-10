import type { ComponentProps } from 'react';
import { createElement, forwardRef } from 'react';

export function FormParameter(
  props: ComponentProps<'fieldset'>,
): JSX.Element {
  return createElement('fieldset', {
    className: 'form__parameter',
    ...props,
  });
}

export function FormLegend(
  props: ComponentProps<'legend'>,
): JSX.Element {
  return createElement('legend', {
    className: 'form__legend',
    ...props,
  });
}

export const FormContainer = (
  forwardRef<HTMLDivElement, ComponentProps<'div'>>((props, ref) => (
    createElement('div', {
      ref,
      className: 'form__container',
      ...props,
    })
  ))
);

export function FormParameterBase({
  children,
  legend,
}: {
  children: JSX.Element;
  legend: string;
}): JSX.Element {
  return (
    <FormParameter>
      <FormLegend>
        {legend}
      </FormLegend>
      <FormContainer>
        {children}
      </FormContainer>
    </FormParameter>
  );
}

function FormLabel(props: ComponentProps<'label'>): JSX.Element {
  return createElement('label', {
    className: 'form__label',
    ...props,
  });
}

function FormName(props: ComponentProps<'span'>): JSX.Element {
  return createElement('span', {
    className: 'form__name',
    ...props,
  });
}

export function FormLabelBase({
  children,
  name,
}: {
  children: JSX.Element;
  name: string;
}): JSX.Element {
  return (
    <FormLabel>
      {children}
      <FormName>
        {name}
      </FormName>
    </FormLabel>
  );
}

export const FormInput = (
  forwardRef<HTMLInputElement, ComponentProps<'input'>>((props, ref) => (
    createElement('input', {
      ref,
      className: 'form__input',
      type: 'radio',
      ...props,
    })
  ))
);

export function Form(props: ComponentProps<'form'>): JSX.Element {
  return createElement('form', {
    className: 'form',
    ...props,
  });
}
