import { useEffect, useState } from 'react';
import { Content } from 'src/modules/content';
import { FilterStore } from 'src/modules/filter';
import { Layout } from 'src/modules/layout';
import { Notification } from 'src/modules/notification';

export function Home(): JSX.Element | null {
  const isMounted = useState(false);

  useEffect(() => {
    FilterStore.mount().then(() => {
      isMounted[1](true);
    });
  }, []);

  return isMounted[0]
    ? (
      <>
        <Layout>
          <Content />
        </Layout>
        <Notification />
      </>
    )
    : null;
}
