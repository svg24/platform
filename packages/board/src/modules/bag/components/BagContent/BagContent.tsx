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
      content: {
        original: bag.item.data?.data.original?.data.snippets.css,
        square: bag.item.data?.data.square?.data.snippets.css,
      },
      file: {
        original: `${bag.item.data?.data.original?.meta.fileName}.css`,
        square: `${bag.item.data?.data.square?.meta.fileName}.css`,
      },
    }, {
      id: 'jsx',
      label: 'JSX',
      content: {
        original: bag.item.data?.data.original?.data.snippets.jsx,
        square: bag.item.data?.data.square?.data.snippets.jsx,
      },
      file: {
        original: `${bag.item.data?.data.original?.meta.fileName}.jsx`,
        square: `${bag.item.data?.data.square?.meta.fileName}.jsx`,
      },
    }, {
      id: 'svg',
      label: 'SVG',
      content: {
        original: bag.item.data?.data.original?.data.snippets.svg,
        square: bag.item.data?.data.square?.data.snippets.svg,
      },
      file: {
        original: `${bag.item.data?.data.original?.meta.fileName}.svg`,
        square: `${bag.item.data?.data.square?.meta.fileName}.svg`,
      },
    }],
  }, {
    id: 'components',
    heading: 'Components',
    items: [{
      id: 'react',
      label: 'React',
      content: {
        original: bag.item.data?.data.original?.data.components.react.js,
        square: bag.item.data?.data.square?.data.components.react.js,
      },
      file: {
        original: `${bag.item.data?.data.original?.meta.componentName}.jsx`,
        square: `${bag.item.data?.data.square?.meta.componentName}.jsx`,
      },
    }, {
      id: 'react-ts',
      label: 'React (ts)',
      content: {
        original: bag.item.data?.data.original?.data.components.react.ts,
        square: bag.item.data?.data.square?.data.components.react.ts,
      },
      file: {
        original: `${bag.item.data?.data.original?.meta.componentName}.jsx`,
        square: `${bag.item.data?.data.square?.meta.componentName}.jsx`,
      },
    }, {
      id: 'vue',
      label: 'Vue',
      content: {
        original: bag.item.data?.data.original?.data.components.vue.js,
        square: bag.item.data?.data.square?.data.components.vue.js,
      },
      file: {
        original: `${bag.item.data?.data.original?.meta.componentName}.vue`,
        square: `${bag.item.data?.data.square?.meta.componentName}.vue`,
      },
    }, {
      id: 'vue-ts',
      label: 'Vue (ts)',
      content: {
        original: bag.item.data?.data.original?.data.components.vue.ts,
        square: bag.item.data?.data.square?.data.components.vue.ts,
      },
      file: {
        original: `${bag.item.data?.data.original?.meta.componentName}.vue`,
        square: `${bag.item.data?.data.square?.meta.componentName}.vue`,
      },
    }],
  }, {
    id: 'api',
    heading: 'Api',
    items: [{
      id: 'content',
      label: 'Content',
      content: {
        original: bag.item.data?.data.original?.data.api.content,
        square: bag.item.data?.data.square?.data.api.content,
      },
      file: {
        original: `${bag.item.data?.data.original?.meta.fileName}.txt`,
        square: `${bag.item.data?.data.square?.meta.fileName}.txt`,
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
          {sec.items.map((item) => (
            <Button
              key={item.id}
              onClick={() => {
                if (bag.item.settings.action && bag.item.settings.type) {
                  const content = item.content[bag.item.settings.type];

                  if (content) {
                    bag.item.settings.action({
                      content,
                      file: item.file[bag.item.settings.type],
                    });
                  }
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      ))}
    </section>
  );
}
