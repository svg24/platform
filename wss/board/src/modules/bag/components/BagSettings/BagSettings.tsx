import { Form } from 'src/components';
import { BagSettingsActions } from './BagSettingsActions';
import { BagSettingsTypes } from './BagSettingsTypes';

export function BagSettings(): JSX.Element {
  return (
    <section className="bag-settings">
      <Form>
        <BagSettingsActions />
        <BagSettingsTypes />
      </Form>
    </section>
  );
}
