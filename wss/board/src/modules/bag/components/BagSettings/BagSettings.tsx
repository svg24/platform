import { useEffect } from 'react';
import {
  Form,
  FormInput,
  FormLabelBase,
  FormParameterBase,
} from 'src/components';
import type { BagStoreItemAction, BagStoreItemType } from 'types/bag';
import { BagStore } from '../../store';

export function BagSettings(): JSX.Element {
  const { ctx } = BagStore;

  const actions = {
    id: 'actions',
    legend: 'Actions',
    mount() {
      useEffect(() => {
        ctx.item.setAction(actions.list.copy.handler);
      }, []);
    },
    onChange: (item) => {
      ctx.item.setAction(item.handler);
    },
    list: {
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
    list: {
      [key in 'copy' | 'download']: {
        checked?: boolean;
        handler: BagStoreItemAction;
        name: string;
      };
    };
    mount: () => void;
    onChange: (item: typeof actions.list.copy) => void;
  };

  actions.mount();

  const types = {
    id: 'types',
    legend: 'Types',
    mount() {
      useEffect(() => {
        ctx.item.setType(types.list.original.id);
      }, []);
    },
    onChange: (item) => {
      ctx.item.setType(item.id);
    },
    list: {
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
    list: {
      [key in BagStoreItemType]: {
        checked?: boolean;
        id: BagStoreItemType;
        name: string;
      };
    };
    mount: () => void;
    onChange: (item: typeof types.list.original) => void;
  };

  types.mount();

  return (
    <section className="bag-settings">
      <Form>
        {[actions, types].map((pr) => (
          <FormParameterBase
            key={pr.id}
            legend={pr.legend}
          >
            <>
              {Object.entries(pr.list).map(([key, value]) => (
                <FormLabelBase
                  key={key}
                  name={value.name}
                >
                  <FormInput
                    defaultChecked={value.checked}
                    name={pr.id}
                    onChange={() => {
                      pr.onChange(value);
                    }}
                  />
                </FormLabelBase>
              ))}
            </>
          </FormParameterBase>
        ))}
      </Form>
    </section>
  );
}
