import { observer } from 'mobx-react-lite';
import { useStore } from 'src/store';

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
}];

export function LayoutFooter(): JSX.Element {
  const { content } = useStore();
  const MetaShowedObserved = observer((): any => (
    content.list.response.meta.length.current
  ));
  const MetaTotalObserved = observer((): any => (
    content.list.response.meta.length.total
  ));

  return (
    <footer className="layout-footer">
      {links.map((link) => (
        <a
          className="layout-footer__link"
          href={link.url}
          key={link.id}
        >
          {link.label}
        </a>
      ))}
      <p className="layout-footer__meta">
        <MetaShowedObserved />
        {'\n/\n'}
        <MetaTotalObserved />
      </p>
    </footer>
  );
}
