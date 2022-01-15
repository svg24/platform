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
        original: bag.item.data?.content.original?.snippets.css,
        square: bag.item.data?.content.square?.snippets.css,
      },
      file: `${bag.item.data?.file.snake}.css`,
    }, {
      id: 'jsx',
      label: 'JSX',
      content: {
        original: bag.item.data?.content.original?.snippets.jsx,
        square: bag.item.data?.content.square?.snippets.jsx,
      },
      file: `${bag.item.data?.file.snake}.jsx`,
    }, {
      id: 'svg',
      label: 'SVG',
      content: {
        original: bag.item.data?.content.original?.snippets.svg,
        square: bag.item.data?.content.square?.snippets.svg,
      },
      file: `${bag.item.data?.file.snake}.svg`,
    }],
  }, {
    id: 'components',
    heading: 'Components',
    items: [{
      id: 'react',
      label: 'React',
      content: {
        original: bag.item.data?.content.original?.components.react.js,
        square: bag.item.data?.content.square?.components.react.js,
      },
      file: `${bag.item.data?.file.camel}.jsx`,
    }, {
      id: 'react-ts',
      label: 'React (ts)',
      content: {
        original: bag.item.data?.content.original?.components.react.ts,
        square: bag.item.data?.content.square?.components.react.ts,
      },
      file: `${bag.item.data?.file.camel}.tsx`,
    }, {
      id: 'vue',
      label: 'Vue',
      content: {
        original: bag.item.data?.content.original?.components.vue.js,
        square: bag.item.data?.content.square?.components.vue.js,
      },
      file: `${bag.item.data?.file.camel}.vue`,
    }],
  }, {
    id: 'api',
    heading: 'Api',
    items: [{
      id: 'content',
      label: 'Content',
      content: {
        original: bag.item.data?.content.original?.api.content,
        square: bag.item.data?.content.square?.api.content,
      },
      file: `${bag.item.data?.file.snake}.txt`,
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
                      file: item.file,
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
