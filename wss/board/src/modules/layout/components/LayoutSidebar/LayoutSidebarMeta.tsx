import { ContentStore } from 'src/modules/content';

export const LayoutSidebarMeta = (): JSX.Element => {
  const contentCtx = ContentStore.ctx;

  return contentCtx.item.data && contentCtx.item.meta
    ? (
      <section className="layout-sidebar__section">
        {!contentCtx.item.meta.src.usage
          ? (
            <p>
              Before use, it is recommended to read the
              {' '}
              <a
                className="layout-sidebar__link"
                href={contentCtx.item.meta.src.usage}
              >
                usage guide
              </a>
              .
            </p>
          )
          : <></>}
        <ul>
          {[{
            id: 'category',
            label: 'Category',
            data: contentCtx.item.meta.category,
          }, {
            id: 'company',
            label: 'Company',
            data: contentCtx.item.meta.company,
          }].map((el) => (
            <li
              className="layout-sidebar__item"
              key={el.id}
            >
              <span>
                {`${el.label}: `}
              </span>
              <button type="button">
                {el.data}
              </button>
            </li>
          ))}
        </ul>
      </section>
    )
    : <></>;
};
