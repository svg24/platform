import { CogIcon } from '@heroicons/react/outline';
import { observer } from 'mobx-react-lite';
import { Search } from 'src/components';
import { LogosStore } from 'src/modules/logos';
import { LayoutHeaderFilter } from './LayoutHeaderFilter';

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
  const logosCtx = LogosStore.ctx;

  const search = {
    el: observer(() => (
      <Search
        val={logosCtx.search.val.field}
        onInput={(ev) => {
          logosCtx.search.process(ev.target.value);
        }}
      />
    )),
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
        <LayoutHeaderFilter />
        <search.el />
      </div>
      <div className="layout-header__side">
        <LayoutHeaderButton
          icon={cog.icon}
          onClick={cog.onClick}
        />
      </div>
    </header>
  );
};
