import { CogIcon } from '@heroicons/react/outline';
import { observer } from 'mobx-react-lite';
import { Search } from 'src/components';
import { ContentStore } from 'src/modules/content';
import { LayoutHeaderFilter } from './LayoutHeaderFilter';

export const LayoutHeader = (): JSX.Element => {
  const { ctx } = ContentStore;

  const search = {
    el: observer(() => (
      <Search
        val={ctx.search.val.field}
        onInput={(ev) => {
          ctx.search.process(ev.target.value);
        }}
      />
    )),
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
        <button
          className="layout-header__btn"
          type="button"
        >
          <CogIcon className="layout-header__icon" />
        </button>
      </div>
    </header>
  );
};
