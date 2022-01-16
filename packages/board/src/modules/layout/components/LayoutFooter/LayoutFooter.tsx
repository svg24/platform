import { observer } from 'mobx-react-lite';
import { useStore } from 'src/store';

const links = [{
  id: 'support',
  label: 'Support',
  url: 'https://svg24.dev/support.html',
}, {
  id: 'policy',
  label: 'Policy',
  url: 'https://svg24.dev/policy.html',
}, {
  id: 'github',
  label: 'GitHub',
  url: 'https://github.com/svg24',
}, {
  id: 'changelog',
  label: 'Changelog',
  url: 'https://svg24.dev/changelog.html',
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
          rel="noreferrer"
          target="_blank"
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
