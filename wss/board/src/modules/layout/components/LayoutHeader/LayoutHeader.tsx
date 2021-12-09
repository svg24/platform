import { CogIcon } from '@heroicons/react/outline';
import { Search } from 'src/modules/search';
import { Settings } from 'src/modules/settings';
import { LayoutHeaderFilter } from './LayoutHeaderFilter';

export function LayoutHeader(): JSX.Element {
  return (
    <header className="layout-header">
      <div className="layout-header__side">
        <img
          alt="Logo"
          className="layout-header__logo"
          src="https://raw.githubusercontent.com/svg24/.github/main/logo.svg"
        />
        <LayoutHeaderFilter />
        <Search />
      </div>
      <div className="layout-header__side">
        <button
          className="layout-header__btn"
          type="button"
        >
          <CogIcon className="layout-header__icon" />
        </button>
        <Settings />
      </div>
    </header>
  );
}
