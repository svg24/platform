import { Logo } from 'src/components';
import { Search } from 'src/modules/search';
import { LayoutHeaderFilter } from './LayoutHeaderFilter';
import { LayoutHeaderSettings } from './LayoutHeaderSettings';

export function LayoutHeader(): JSX.Element {
  return (
    <header className="layout-header">
      <div className="layout-header__side">
        <Logo className="layout-header__logo" />
        <LayoutHeaderFilter />
        <Search />
      </div>
      <div className="layout-header__side">
        <LayoutHeaderSettings />
      </div>
    </header>
  );
}
