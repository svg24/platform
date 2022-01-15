import { Button, HeadingLevel3 } from 'src/components';
import { useStore } from 'src/store';

export function BagContent(): JSX.Element {
  const { bag } = useStore();

  const sections = [{
    id: 'snippets',
    heading: 'Snippets',
    items: [{
      id: 'css',
      label: 'CSS',
      original: {
        content: bag.item.data?.data.original?.data.snippets.css,
        file: `${bag.item.data?.data.original?.meta.fileName}.css`,
      },
      square: {
        content: bag.item.data?.data.square?.data.snippets.css,
        file: `${bag.item.data?.data.square?.meta.fileName}.css`,
      },
    }, {
      id: 'jsx',
      label: 'JSX',
      original: {
        content: bag.item.data?.data.original?.data.snippets.jsx,
        file: `${bag.item.data?.data.original?.meta.fileName}.jsx`,
      },
      square: {
        content: bag.item.data?.data.square?.data.snippets.jsx,
        file: `${bag.item.data?.data.square?.meta.fileName}.jsx`,
      },
    }, {
      id: 'svg',
      label: 'SVG',
      original: {
        content: bag.item.data?.data.original?.data.snippets.svg,
        file: `${bag.item.data?.data.original?.meta.fileName}.svg`,
      },
      square: {
        content: bag.item.data?.data.square?.data.snippets.svg,
        file: `${bag.item.data?.data.square?.meta.fileName}.svg`,
      },
    }],
  }, {
    id: 'components',
    heading: 'Components',
    items: [{
      id: 'react',
      label: 'React',
      original: {
        content: bag.item.data?.data.original?.data.components.react.js,
        file: `${bag.item.data?.data.original?.meta.componentName}.jsx`,
      },
      square: {
        content: bag.item.data?.data.square?.data.components.react.js,
        file: `${bag.item.data?.data.square?.meta.componentName}.jsx`,
      },
    }, {
      id: 'react-ts',
      label: 'React (ts)',
      original: {
        content: bag.item.data?.data.original?.data.components.react.ts,
        file: `${bag.item.data?.data.original?.meta.componentName}.jsx`,
      },
      square: {
        content: bag.item.data?.data.square?.data.components.react.ts,
        file: `${bag.item.data?.data.square?.meta.componentName}.jsx`,
      },
    }, {
      id: 'vue',
      label: 'Vue',
      original: {
        content: bag.item.data?.data.original?.data.components.vue.js,
        file: `${bag.item.data?.data.original?.meta.componentName}.vue`,
      },
      square: {
        content: bag.item.data?.data.square?.data.components.vue.js,
        file: `${bag.item.data?.data.square?.meta.componentName}.vue`,
      },
    }, {
      id: 'vue-ts',
      label: 'Vue (ts)',
      original: {
        content: bag.item.data?.data.original?.data.components.vue.ts,
        file: `${bag.item.data?.data.original?.meta.componentName}.vue`,
      },
      square: {
        content: bag.item.data?.data.square?.data.components.vue.ts,
        file: `${bag.item.data?.data.square?.meta.componentName}.vue`,
      },
    }],
  }, {
    id: 'api',
    heading: 'Api',
    items: [{
      id: 'content',
      label: 'Content',
      original: {
        content: bag.item.data?.data.original?.data.api.content,
        file: `${bag.item.data?.data.original?.meta.fileName}.txt`,
      },
      square: {
        content: bag.item.data?.data.square?.data.api.content,
        file: `${bag.item.data?.data.square?.meta.fileName}.txt`,
      },
    }],
  }];

  return (
    <section className="bag-content">
      {sections.map((sec) => (
        <div key={sec.id}>
          <HeadingLevel3>
            {sec.heading}
          </HeadingLevel3>
          <div className="bag-content__container">
            {sec.items.map((item) => (
              <Button
                key={item.id}
                onClick={() => {
                  if (bag.item.settings.action && bag.item.settings.type) {
                    const { content, file } = item[bag.item.settings.type];
                    if (content) bag.item.settings.action({ content, file });
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
