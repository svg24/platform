import { observer } from 'mobx-react-lite';
import { useStore } from 'src/store';

export function LayoutFooter(): JSX.Element {
  const { content } = useStore();

  const links = [{
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/svg24',
  }, {
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
    showed: observer(() => <>{content.list.result.meta.length.current}</>),
    total: observer(() => <>{content.list.result.meta.length.total}</>),
  };

  return (
    <footer className="layout-footer">
      {links}
      <p className="layout-footer__meta">
        <meta.showed />
        {'\n/\n'}
        <meta.total />
      </p>
    </footer>
  );
}
