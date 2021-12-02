import { useEffect, useState } from 'react';
import { Content, ContentStore } from '../modules/content';
import { FilterStore } from '../modules/filter';
import { Layout, LayoutStore } from '../modules/layout';
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
            <ContentStore.Provider>
              <Layout>
                <Content />
              </Layout>
            </ContentStore.Provider>
          </FilterStore.Provider>
        </LayoutStore.Provider>
      </UserStore.Provider>
    )
    : <></>;
};
