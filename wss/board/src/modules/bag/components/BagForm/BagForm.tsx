import { useEffect } from 'react';
import type { BagStoreItemAction, BagStoreItemType } from 'types/bag';
import { BagStore } from '../../store';

export function BagForm(): JSX.Element {
  const { ctx } = BagStore;

  const actions = {
    id: 'actions',
    heading: 'Actions',
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
    heading: string;
    id: string;
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
    heading: 'Types',
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
    heading: string;
    id: string;
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
    <form className="bag-form">
      {[actions, types].map((obj) => (
        <fieldset key={obj.id}>
          <h2 className="bag-root__heading">
            {obj.heading}
          </h2>
          <div className="bag-form__container">
            {Object.entries(obj.list).map(([key, val]) => (
              <label
                className="bag-form__label"
                key={key}
              >
                <input
                  className="bag-form__input"
                  defaultChecked={val.checked}
                  name={obj.id}
                  type="radio"
                  onChange={() => {
                    obj.onChange(val);
                  }}
                />
                <span className="bag-form__name">
                  {val.name}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </form>
  );
}
