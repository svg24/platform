import { useEffect, useState } from 'react';
import { FilterStore } from '../modules/filter';
import { Layout, LayoutStore } from '../modules/layout';
import { Logos, LogosStore } from '../modules/logos';

export default (): JSX.Element => {
  const isMounted = useState(false);

  useEffect(() => {
    FilterStore.mount().then(() => {
      isMounted[1](true);
    });
  }, []);

  return isMounted[0]
    ? (
      <LayoutStore.Provider>
        <FilterStore.Provider>
          <LogosStore.Provider>
            <Layout>
              <Logos />
            </Layout>
          </LogosStore.Provider>
        </FilterStore.Provider>
      </LayoutStore.Provider>
    )
    : <></>;
};
