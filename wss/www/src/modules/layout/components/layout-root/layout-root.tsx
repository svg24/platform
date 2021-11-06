import type { ReactElement } from 'react';
import LayoutFooter from '../layout-footer/layout-footer';
import LayoutHeader from '../layout-header/layout-header';
import './layout-root.css';

export default ({ children }: { children: ReactElement }): JSX.Element => (
  <>
    <LayoutHeader />
    {children}
    <LayoutFooter />
  </>
);
