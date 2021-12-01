import { useEffect, useState } from 'react';
import { FilterStore } from '../modules/filter';
import { Layout, LayoutStore } from '../modules/layout';
import { Logos, LogosStore } from '../modules/logos';
import { UserStore } from '../modules/usr';

export default (): JSX.Element => {
  const isMounted = useState(false);

  useEffect(() => {
    FilterStore.mount().then(() => {
      isMounted[1](true);
    });
  }, []);

  return isMounted[0]
    ? (
      <UserStore.Provider>
        <LayoutStore.Provider>
          <FilterStore.Provider>
            <LogosStore.Provider>
              <Layout>
                <Logos />
              </Layout>
            </LogosStore.Provider>
          </FilterStore.Provider>
        </LayoutStore.Provider>
      </UserStore.Provider>
    )
    : <></>;
};
