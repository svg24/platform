export const LayoutNav = (
  { companies }: { companies: string[] },
): JSX.Element => {
  const nav = {
    companies: companies.map((item) => (
      <li
        className="layout-nav__item"
        key={item}
      >
        {item}
      </li>
    )),
  };

  return (
    <nav className="layout-nav">
      <p className="layout-nav__label">
        Companies
      </p>
      <ul className="layout-nav__list">
        {nav.companies}
      </ul>
    </nav>
  );
};
