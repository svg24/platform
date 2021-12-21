import { forwardRef } from 'react';
import { Form } from 'src/components';

export const FilterRoot = forwardRef<HTMLFormElement, {
  children: JSX.Element;
}>((props, ref) => (
  <Form
    className="filter-root"
    ref={ref}
  >
    {props.children}
  </Form>
));
