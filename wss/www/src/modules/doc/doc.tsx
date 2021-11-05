import React, { useEffect } from 'react';
import type { ReactElement } from 'react';
import store, { DocStore } from './store';
import './doc.css';

export default ({ children }: { children: ReactElement }): JSX.Element => {
  useEffect(() => {
    if (DocStore.isTouchDevice) {
      store.touch();
    }
  });

  return (
    <store.provider>
      {children}
    </store.provider>
  );
};
