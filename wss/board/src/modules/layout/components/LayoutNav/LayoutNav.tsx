import { LogosStore } from 'src/modules/logos';

export const LayoutNav = (): JSX.Element => {
  const { ctx } = LogosStore;

  const categories = {
    label: 'Categories',
    items: ctx.categories.items?.map((item) => (
      <li
        className="layout-nav__item"
        key={item.id}
      >
        {item.name}
      </li>
    )),
  };

  const companies = {
    label: 'Companies',
    items: ctx.companies.items?.map((item) => (
      <li
        className="layout-nav__item"
        key={item.id}
      >
        {item.name}
      </li>
    )),
  };

  return (
    <nav className="layout-nav">
      {
        [categories, companies].map((prop) => (
          <>
            <p className="layout-nav__label">
              {prop.label}
            </p>
            <ul className="layout-nav__list">
              {prop.items}
            </ul>
          </>
        ))
      }
    </nav>
  );
};
