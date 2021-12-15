import { observer } from 'mobx-react-lite';
import { useStore } from 'src/store';

export function ContentList({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element {
  const { settings } = useStore();

  const root = {
    el: observer(() => (
      <ol className={`content-list ${root.mod}`}>
        {children}
      </ol>
    )),
    get mod() {
      return settings.size.value.current
        ? `content-list_${settings.size.value.current.id}`
        : '';
    },
  };

  return <root.el />;
}
