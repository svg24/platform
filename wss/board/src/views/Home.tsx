import { useEffect, useState } from 'react';
import { BagStore } from 'src/modules/bag';
import { Content, ContentStore } from 'src/modules/content';
import { FilterStore } from 'src/modules/filter';
import { Layout, LayoutStore } from 'src/modules/layout';
import { SearchStore } from 'src/modules/search';
import { SettingsStore } from 'src/modules/settings';
import { UserStore } from 'src/modules/user';

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
        <SettingsStore.Provider>
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
        </SettingsStore.Provider>
      </UserStore.Provider>
    )
    : <></>;
};
