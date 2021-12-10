import { Logo } from 'src/components';
import { Search } from 'src/modules/search';
import { Settings } from 'src/modules/settings';
import { LayoutHeaderFilter } from './LayoutHeaderFilter';

export function LayoutHeader(): JSX.Element {
  return (
    <header className="layout-header">
      <div className="layout-header__side">
        <Logo className="layout-header__logo" />
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
