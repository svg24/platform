import {
  AdjustmentsIcon,
  CogIcon,
  FolderIcon,
  FolderOpenIcon,
} from '@heroicons/react/outline';
import { observer } from 'mobx-react-lite';
import { Search } from 'src/components';
import { LogosStore } from 'src/modules/logos';
import { LayoutStore } from '../../store';

const LayoutHeaderButton = (params: {
  icon: (props: { className: string }) => JSX.Element;
  onClick: () => void;
}): JSX.Element => {
  const { onClick } = params;

  return (
    <button
      className="layout-header__btn"
      type="button"
      onClick={onClick}
    >
      <params.icon className="layout-header__icon" />
    </button>
  );
};

export const LayoutHeader = (): JSX.Element => {
  const layoutCtx = LayoutStore.ctx;
  const logosCtx = LogosStore.ctx;

  const nav = {
    icon: observer((props: { className: string }) => {
      const Icon = layoutCtx.nav.isVisible ? FolderOpenIcon : FolderIcon;

      return <Icon className={props.className} />;
    }),
    get onClick() {
      return layoutCtx.root.nav.toggle;
    },
  };

  const search = {
    el: observer(() => (
      <Search
        val={logosCtx.filter.params.search.val.field || ''}
        onInput={(ev) => {
          logosCtx.filter.params.search.process(ev.target.value);
        }}
      />
    )),
  };

  const adj = {
    icon: AdjustmentsIcon,
    onClick: () => {},
  };

  const cog = {
    icon: CogIcon,
    onClick: () => {},
  };

  return (
    <header className="layout-header">
      <div className="layout-header__side">
        <img
          alt="Logo"
          className="layout-header__logo"
          src="https://raw.githubusercontent.com/svg24/.github/main/logo.svg"
        />
        <LayoutHeaderButton
          icon={nav.icon}
          onClick={nav.onClick}
        />
        <search.el />
      </div>
      <div className="layout-header__side">
        <div className="layout-header__container">
          <LayoutHeaderButton
            icon={adj.icon}
            onClick={adj.onClick}
          />
        </div>
        <div className="layout-header__container">
          <LayoutHeaderButton
            icon={cog.icon}
            onClick={cog.onClick}
          />
        </div>
      </div>
    </header>
  );
};
