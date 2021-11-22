import { Layout, LayoutStore } from '../modules/layout';
import { Logos, LogosStore } from '../modules/logos';

export default (): JSX.Element => (
  <LayoutStore.Provider>
    <LogosStore.Provider>
      <Layout>
        <Logos />
      </Layout>
    </LogosStore.Provider>
  </LayoutStore.Provider>
);
