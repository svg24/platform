import { observer } from 'mobx-react-lite';
import { LogosStore } from 'src/modules/logos';

export const LayoutFooter = (): JSX.Element => {
  const { ctx } = LogosStore;
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
  const meta = {
    showed: observer(() => <>{ctx.meta.length.cur}</>),
    total: observer(() => <>{ctx.meta.length.total}</>),
  };

  return (
    <footer className="layout-footer">
      {links}
      <p className="layout-footer__meta">
        <meta.showed />
        {' '}
        /
        {' '}
        <meta.total />
      </p>
    </footer>
  );
};
