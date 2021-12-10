import { Button, HeadingLevel3 } from 'src/components';
import { BagStore } from '../../store';

export function BagContent(): JSX.Element {
  const { ctx } = BagStore;

  const sections = [{
    id: 'snippets',
    heading: 'Snippets',
    items: [{
      id: 'css',
      label: 'CSS',
      content: {
        original: ctx.item.data?.content.original?.snippets.css,
        square: ctx.item.data?.content.square?.snippets.css,
      },
      file: `${ctx.item.data?.file.snake}.css`,
    }, {
      id: 'jsx',
      label: 'JSX',
      content: {
        original: ctx.item.data?.content.original?.snippets.jsx,
        square: ctx.item.data?.content.square?.snippets.jsx,
      },
      file: `${ctx.item.data?.file.snake}.jsx`,
    }, {
      id: 'svg',
      label: 'SVG',
      content: {
        original: ctx.item.data?.content.original?.snippets.svg,
        square: ctx.item.data?.content.square?.snippets.svg,
      },
      file: `${ctx.item.data?.file.snake}.svg`,
    }],
  }, {
    id: 'components',
    heading: 'Components',
    items: [{
      id: 'react',
      label: 'React',
      content: {
        original: ctx.item.data?.content.original?.components.react.js,
        square: ctx.item.data?.content.square?.components.react.js,
      },
      file: `${ctx.item.data?.file.camel}.jsx`,
    }, {
      id: 'react-ts',
      label: 'React (ts)',
      content: {
        original: ctx.item.data?.content.original?.components.react.ts,
        square: ctx.item.data?.content.square?.components.react.ts,
      },
      file: `${ctx.item.data?.file.camel}.tsx`,
    }, {
      id: 'vue',
      label: 'Vue',
      content: {
        original: ctx.item.data?.content.original?.components.vue.js,
        square: ctx.item.data?.content.square?.components.vue.js,
      },
      file: `${ctx.item.data?.file.camel}.vue`,
    }],
  }, {
    id: 'links',
    heading: 'Links',
    items: [{
      id: 'url',
      label: 'URL',
      content: {
        original: ctx.item.data?.content.original?.links.url,
        square: ctx.item.data?.content.square?.links.url,
      },
      file: `${ctx.item.data?.file.snake}.txt`,
    }],
  }, {
    id: 'packages',
    heading: 'Packages',
    items: [{
      id: 'react',
      label: 'React',
      content: {
        original: ctx.item.data?.content.original?.packages.react,
        square: ctx.item.data?.content.square?.packages.react,
      },
      file: `${ctx.item.data?.file.camel}.jsx`,
    }, {
      id: 'react-ts',
      label: 'React (ts)',
      content: {
        original: ctx.item.data?.content.original?.packages.react,
        square: ctx.item.data?.content.square?.packages.react,
      },
      file: `${ctx.item.data?.file.camel}.tsx`,
    }, {
      id: 'vue',
      label: 'Vue',
      content: {
        original: ctx.item.data?.content.original?.packages.vue,
        square: ctx.item.data?.content.square?.packages.vue,
      },
      file: `${ctx.item.data?.file.camel}.vue`,
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
                if (ctx.item.action && ctx.item.type) {
                  const content = item.content[ctx.item.type];

                  if (content) {
                    ctx.item.action({
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
