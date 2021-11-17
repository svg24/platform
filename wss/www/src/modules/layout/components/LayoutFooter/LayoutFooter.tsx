export const LayoutFooter = (): JSX.Element => {
  const links = [{
    id: 'policy',
    label: 'Policy',
    url: '/',
  }, {
    id: 'support',
    label: 'Support',
    url: '/',
  }, {
    id: 'changelog',
    label: 'Changelog',
    url: '/',
  }].map((link) => (
    <a
      className="layout-footer__link"
      href={link.url}
      key={link.id}
    >
      {link.label}
    </a>
  ));

  return (
    <footer className="layout-footer">
      {links}
      <p className="layout-footer__pr">
        total logos / showed logos
      </p>
    </footer>
  );
};
