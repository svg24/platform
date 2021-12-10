import { useEffect } from 'react';
import {
  Form,
  FormInput,
  FormLabel,
  FormParameter,
} from 'src/components';
import type {
  BagStoreItemSettingsAction,
  BagStoreItemSettingsType,
} from 'types/bag';
import { BagStore } from '../../store';

export function BagSettings(): JSX.Element {
  const { ctx } = BagStore;

  const actions = {
    id: 'actions',
    legend: 'Actions',
    mount() {
      useEffect(() => {
        ctx.item.settings.setAction(actions.options.copy.handler);
      }, []);
    },
    set: (item) => {
      ctx.item.settings.setAction(item.handler);
    },
    options: {
      copy: {
        name: 'Copy',
        checked: true,
        async handler({ content }) {
          await navigator.clipboard.writeText(content);
        },
      },
      download: {
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
      },
    },
  } as {
    id: string;
    legend: string;
    mount: () => void;
    options: {
      [key in 'copy' | 'download']: {
        checked?: boolean;
        handler: BagStoreItemSettingsAction;
        name: string;
      };
    };
    set: (item: typeof actions.options.copy) => void;
  };

  actions.mount();

  const types = {
    id: 'types',
    legend: 'Types',
    mount() {
      useEffect(() => {
        ctx.item.settings.setType(types.options.original.id);
      }, []);
    },
    set: (item) => {
      ctx.item.settings.setType(item.id);
    },
    options: {
      original: {
        id: 'original',
        name: 'Original',
        checked: true,
      },
      ...ctx.item.data?.content.square
        ? {
          square: {
            id: 'square',
            name: 'Square',
          },
        }
        : {},
    },
  } as {
    id: string;
    legend: string;
    mount: () => void;
    options: {
      [key in BagStoreItemSettingsType]: {
        checked?: boolean;
        id: BagStoreItemSettingsType;
        name: string;
      };
    };
    set: (item: typeof types.options.original) => void;
  };

  types.mount();

  return (
    <section className="bag-settings">
      <Form>
        {[actions, types].map((pr) => (
          <FormParameter
            key={pr.id}
            legend={pr.legend}
          >
            {Object.entries(pr.options).map(([key, value]) => (
              <FormLabel
                key={key}
                name={value.name}
              >
                <FormInput
                  defaultChecked={value.checked}
                  name={pr.id}
                  onChange={() => {
                    pr.set(value);
                  }}
                />
              </FormLabel>
            ))}
          </FormParameter>
        ))}
      </Form>
    </section>
  );
}
