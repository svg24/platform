import { observer } from 'mobx-react-lite';
import type { ComponentProps } from 'react';
import { createElement, createRef, forwardRef } from 'react';
import type {
  StoreFormParameter,
  StoreFormParameterOptionsItem,
} from 'types/store';

export function Form(props: ComponentProps<'form'>): JSX.Element {
  return createElement('form', {
    className: 'form',
    ...props,
  });
}

export function FormParameter(props: {
  legend: string;
} & ComponentProps<'fieldset'>): JSX.Element {
  const { children, className, legend } = props;

  return createElement('fieldset', {
    ...props,
    className: `form__parameter ${className || ''}`,
  }, createElement('legend', {
    className: 'form__legend',
  }, legend), createElement('div', {
    className: 'form__container',
  }, children));
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

export function FormLabel(props: {
  name: string;
} & ComponentProps<'label'>): JSX.Element {
  const { children, name } = props;

  return createElement('label', {
    className: 'form__label',
    ...props,
  }, children, createElement('span', {
    className: 'form__name',
  }, name));
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

export function FormLabelComplete({
  onChange,
  onClick,
  option,
  parameter,
}: {
  onChange?: () => void;
  onClick?: (isChecked: boolean) => void;
  option: StoreFormParameterOptionsItem;
  parameter: StoreFormParameter<any, StoreFormParameterOptionsItem>;
}): JSX.Element {
  const input = {
    ref: createRef<HTMLInputElement>(),
    isCurrent: false,
    el: observer(() => {
      input.isCurrent = parameter.value.checkIsCurrent(option.id);

      if (input.ref.current) input.ref.current.checked = input.isCurrent;

      return (
        <FormInput
          defaultChecked={input.isCurrent}
          name={parameter.id}
          ref={input.ref}
          onChange={onChange || undefined}
          onClick={onClick
            ? (el) => {
              onClick(input.isCurrent
                && (el.target as HTMLInputElement).checked);
            }
            : undefined}
        />
      );
    }),
  };

  return (
    <FormLabel name={option.name}>
      <input.el />
    </FormLabel>
  );
}

FormLabelComplete.defaultProps = {
  onChange: undefined,
  onClick: undefined,
};
