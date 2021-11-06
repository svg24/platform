import { useEffect } from 'react';
import type { ReactElement } from 'react';
import DocStore from '../store';
import './doc.css';

export default ({ children }: { children: ReactElement }): JSX.Element => {
  useEffect(() => {
    // if (DocStore.isTouchDevice) {
    //   store.touch();
    // }
  });

  return (
    <DocStore.Provider>
      {children}
    </DocStore.Provider>
  );
};
