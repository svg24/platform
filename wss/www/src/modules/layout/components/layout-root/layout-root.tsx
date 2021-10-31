import React, { ReactElement } from 'react';
import LayoutHeader from '../layout-header/layout-header';
import LayoutFooter from '../layout-footer/layout-footer';
import './layout-root.css';

export default ({ children }: { children: ReactElement }) => (
  <React.StrictMode>
    <LayoutHeader />
    {children}
    <LayoutFooter />
  </React.StrictMode>
);
