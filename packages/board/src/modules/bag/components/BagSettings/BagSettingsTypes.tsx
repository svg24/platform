import { useEffect } from 'react';
import { FormInput, FormLabel, FormParameter } from 'src/components';
import { useStore } from 'src/store';
import type {
  SettingsParameterTypes,
  SettingsParameterTypesOptionsItem,
} from 'types/bag';

const original: SettingsParameterTypesOptionsItem = {
  id: 'original',
  name: 'Original',
  checked: true,
};
const square: SettingsParameterTypesOptionsItem = {
  id: 'square',
  name: 'Square',
};

export function BagSettingsTypes(): JSX.Element {
  const { bag } = useStore();
  const parameter: SettingsParameterTypes = {
    id: 'types',
    legend: 'Types',
    options: [
      original,
      ...bag.item.data?.data.square ? [square] : [],
    ],
    onChange(item) {
      bag.item.settings.setType(item.id);
    },
  };

  useEffect(() => {
    parameter.onChange(original);
  }, []);

  return (
    <FormParameter legend={parameter.legend}>
      {parameter.options.map((opt) => (
        <FormLabel
          key={opt.id}
          name={opt.name}
        >
          <FormInput
            defaultChecked={opt.checked}
            name={parameter.id}
            onChange={() => {
              parameter.onChange(opt);
            }}
          />
        </FormLabel>
      ))}
    </FormParameter>
  );
}
