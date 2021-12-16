import { useEffect } from 'react';
import { FormInput, FormLabel, FormParameter } from 'src/components';
import { useStore } from 'src/store';
import type {
  SettingsParameterActions,
  SettingsParameterActionsOptionsItem,
} from 'types/bag';

const copy: SettingsParameterActionsOptionsItem = {
  id: 'copy',
  name: 'Copy',
  checked: true,
  async handler({ content }) {
    await navigator.clipboard.writeText(content);
  },
};
const download: SettingsParameterActionsOptionsItem = {
  id: 'download',
  name: 'Download',
  async handler({ content, file }) {
    const blob = new Blob([content]);
    const link = document.createElement('a');

    Object.assign(link, {
      href: window.URL.createObjectURL(blob),
      download: file,
    });

    link.click();
    link.remove();
  },
};

export function BagSettingsActions(): JSX.Element {
  const { bag } = useStore();
  const parameter: SettingsParameterActions = {
    id: 'actions',
    legend: 'Actions',
    options: [copy, download],
    onChange(item) {
      bag.item.settings.setAction(item.handler);
    },
  };

  useEffect(() => {
    parameter.onChange(copy);
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
