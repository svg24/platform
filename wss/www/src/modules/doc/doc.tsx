import React from 'react';
import store, { DocStore } from './store';
import './doc.css';

export default ({ children }: { children: React.ReactElement }) => {
  React.useEffect(() => {
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
