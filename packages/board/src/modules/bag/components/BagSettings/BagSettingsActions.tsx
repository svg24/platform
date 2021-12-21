import { useEffect } from 'react';
import { FormInput, FormLabel, FormParameter } from 'src/components';
import { useStore } from 'src/store';
import type {
  SettingsParameterActions,
  SettingsParameterActionsOptionsItem,
} from 'types/bag';

export function BagSettingsActions(): JSX.Element {
  const { bag, notification } = useStore();
  const copy: SettingsParameterActionsOptionsItem = {
    id: 'copy',
    name: 'Copy',
    checked: true,
    async handler({ content }) {
      try {
        await navigator.clipboard.writeText(content);
        notification.showPositive('Copied');
      } catch (error) {
        notification.showNegative('Copy error');
      }
    },
  };
  const download: SettingsParameterActionsOptionsItem = {
    id: 'download',
    name: 'Download',
    async handler({ content, file }) {
      try {
        const blob = new Blob([content]);
        const link = document.createElement('a');

        Object.assign(link, {
          href: window.URL.createObjectURL(blob),
          download: file,
        });

        link.click();
        link.remove();
        notification.showPositive('Downloaded');
      } catch (error) {
        notification.showNegative('Download error');
      }
    },
  };
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
