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
  const info = {
    showed: observer(() => (
      <>
        {ctx.list.items?.length || 0}
      </>
    )),
    total: observer(() => (
      <>
        {ctx.info.total}
      </>
    )),
  };

  return (
    <footer className="layout-footer">
      {links}
      <p className="layout-footer__info">
        <info.showed />
        {' '}
        /
        {' '}
        <info.total />
      </p>
    </footer>
  );
};
