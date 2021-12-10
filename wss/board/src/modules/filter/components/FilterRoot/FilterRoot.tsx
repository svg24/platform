import { Form } from 'src/components';

export function FilterRoot({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return (
    <Form className={`${Form({}).props.className} filter-root`}>
      {children}
    </Form>
  );
}
