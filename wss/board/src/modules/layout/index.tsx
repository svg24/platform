import { Bag } from 'src/modules/bag';
import { LayoutFooter } from './components/LayoutFooter';
import { LayoutHeader } from './components/LayoutHeader';
import { LayoutMain } from './components/LayoutMain';
import { LayoutRoot } from './components/LayoutRoot';
import { LayoutStore } from './store';

function Layout({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <LayoutRoot>
      <LayoutHeader />
      <LayoutMain>
        {children}
      </LayoutMain>
      <Bag />
      <LayoutFooter />
    </LayoutRoot>
  );
}

export { Layout, LayoutStore };
