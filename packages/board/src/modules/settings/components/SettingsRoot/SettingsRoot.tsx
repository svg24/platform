import { Form, FormLabelComplete, FormParameter } from 'src/components';
import { useStore } from 'src/store';
import { deepCopy } from 'src/utils';

export function SettingsRoot(): JSX.Element {
  const { settings } = useStore();
  const params = [deepCopy(settings.size, { legend: 'Size' })];

  return (
    <Form>
      {params.map((pr) => (
        <FormParameter
          key={pr.id}
          legend={pr.legend}
        >
          {pr.options?.map((opt) => (
            <FormLabelComplete
              key={opt.id}
              option={opt}
              parameter={pr}
              onChange={() => {
                pr.set(opt);
              }}
            />
          ))}
        </FormParameter>
      ))}
    </Form>
  );
}
