import { LayoutStore } from 'src/modules/layout';
import { BagStore } from '../../store';

export function BagMeta(): JSX.Element {
  const layoutCtx = LayoutStore.ctx;
  const bagCtx = BagStore.ctx;

  const general = {
    list: bagCtx.item.meta
      ? [{
        id: 'category',
        label: 'Category',
        meta: bagCtx.item.meta.category,
      }, {
        id: 'company',
        label: 'Company',
        meta: bagCtx.item.meta.company,
      }]
      : [],
    onClick: (id: string) => {
      layoutCtx.bag.hide();
    },
  };

  const individual = {
    list: bagCtx.item.data
      ? [{
        id: 'version',
        label: 'Version',
        meta: new Date(bagCtx.item.data?.version).toLocaleString('en', {
          year: 'numeric',
        }),
      }]
      : [],
  };

  return (
    <section className="bag-meta">
      {bagCtx.item.meta?.src.usage
        ? (
          <p>
            {'Before use, it is recommended to read the '}
            <a
              className="bag-meta__link"
              href={bagCtx.item.meta.src.usage}
            >
              usage guide
            </a>
            .
          </p>
        )
        : <></>}
      <ul>
        {general.list.length
          ? general.list.map((item) => (
            <li
              className="bag-meta__item"
              key={item.id}
            >
              <span>
                {`${item.label}: `}
              </span>
              <button
                className="bag-meta__btn"
                type="button"
                onClick={() => {
                  general.onClick(item.id);
                }}
              >
                {item.meta?.name}
              </button>
            </li>
          ))
          : {}}
        {individual.list.length
          ? individual.list.map((item) => (
            <li
              className="bag-meta__item"
              key={item.id}
            >
              {`${item.label}: ${item.meta}`}
            </li>
          ))
          : {}}
      </ul>
    </section>
  );
}
