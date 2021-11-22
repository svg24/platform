import { observer } from 'mobx-react-lite';
import { LayoutFooter } from './components/LayoutFooter';
import { LayoutHeader } from './components/LayoutHeader';
import { LayoutMain } from './components/LayoutMain';
import { LayoutRoot } from './components/LayoutRoot';
import { LayoutSidebar } from './components/LayoutSidebar';
import { LayoutStore } from './store';

export {
  LayoutStore,
};

export const Layout = (
  { children }: { children: JSX.Element },
): JSX.Element => {
  const { ctx } = LayoutStore;

  const sidebar = {
    el: observer(() => (
      ctx.sidebar.isVisible
        ? <LayoutSidebar />
        : <></>
    )),
  };

  return (
    <LayoutRoot>
      <LayoutHeader />
      <LayoutMain>
        {children}
      </LayoutMain>
      <sidebar.el />
      <LayoutFooter />
    </LayoutRoot>
  );
};
