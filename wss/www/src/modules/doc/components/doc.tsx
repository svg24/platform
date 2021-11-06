import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { UsrStore } from 'src/modules/usr';
import DocStore from '../store';
import './doc.css';

export default ({ children }: { children: ReactElement }): JSX.Element => {
  useEffect(() => {
    if (UsrStore.isTouch) DocStore.touch();
  });

  return (
    <DocStore.Provider>
      {children}
    </DocStore.Provider>
  );
};
