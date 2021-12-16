import {
  Form,
  FormLabelComplete,
  FormParameter,
} from 'src/components';
import { useStore } from 'src/store';
import { deepCopy } from 'src/utils';

export function SettingsRoot(): JSX.Element {
  const { settings } = useStore();
  const parameters = [deepCopy(settings.size, { legend: 'Size' })];

  return (
    <Form>
      {parameters.map((pr) => (
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
