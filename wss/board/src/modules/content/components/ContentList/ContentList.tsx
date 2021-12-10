import { observer } from 'mobx-react-lite';
import { SettingsStore } from 'src/modules/settings';

export function ContentList({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element {
  const { ctx } = SettingsStore;

  const root = {
    el: observer(() => (
      <ol className={`content-list ${root.mod}`}>
        {children}
      </ol>
    )),
    get mod() {
      return ctx.size.value.current
        ? `content-list_${ctx.size.value.current.id}`
        : '';
    },
  };

  return <root.el />;
}
