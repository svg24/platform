import { useEffect, useState } from 'react';
import { SearchStore } from 'src/modules/search';
import { BagStore } from '../modules/bag';
import { Content, ContentStore } from '../modules/content';
import { FilterStore } from '../modules/filter';
import { Layout, LayoutStore } from '../modules/layout';
import { UserStore } from '../modules/user';

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
            <SearchStore.Provider>
              <ContentStore.Provider>
                <BagStore.Provider>
                  <Layout>
                    <Content />
                  </Layout>
                </BagStore.Provider>
              </ContentStore.Provider>
            </SearchStore.Provider>
          </FilterStore.Provider>
        </LayoutStore.Provider>
      </UserStore.Provider>
    )
    : <></>;
};
