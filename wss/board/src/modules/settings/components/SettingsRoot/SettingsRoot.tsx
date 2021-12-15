import {
  Form,
  FormLabelComplete,
  FormParameter,
} from 'src/components';
import { useStore } from 'src/store';
import { deepAssign } from 'src/utils';

export function SettingsRoot(): JSX.Element {
  const { settings } = useStore();

  return (
    <Form>
      {[deepAssign(settings.size, { legend: 'Size' })].map((pr) => (
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
