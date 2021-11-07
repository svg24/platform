import type { ReactElement } from 'react';
import LayoutFooter from '../layout-footer';
import LayoutHeader from '../layout-header';
import './index.css';

export default ({ children }: { children: ReactElement }): JSX.Element => (
  <>
    <LayoutHeader />
    {children}
    <LayoutFooter />
  </>
);
