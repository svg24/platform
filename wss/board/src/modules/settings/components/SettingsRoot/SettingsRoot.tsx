import {
  Form,
  FormLabelComplete,
  FormParameter,
} from 'src/components';
import { deepAssign } from 'src/utils';
import { SettingsStore } from '../../store';

export function SettingsRoot(): JSX.Element {
  const { ctx } = SettingsStore;

  const parameters = [deepAssign(ctx.size, { legend: 'Size' })];

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
