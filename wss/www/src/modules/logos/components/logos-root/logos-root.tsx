import React from 'react';
import store from '../../store';
import LogosList from '../logos-list/logos-list';
import LogosSearch from '../logos-search/logos-search';
import './logos-root.css';

export default () => (
  <store.provider>
    <main className="logos-root">
      <LogosSearch />
      <LogosList />
    </main>
  </store.provider>
);
