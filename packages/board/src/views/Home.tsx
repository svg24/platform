import { useEffect, useState } from 'react';
import { Content } from 'src/modules/content';
import { FilterStore } from 'src/modules/filter';
import { Layout, LayoutStore } from 'src/modules/layout';
import { Notification } from 'src/modules/notification';
import { SettingsStore } from 'src/modules/settings';

export function Home(): JSX.Element | null {
  const [isMounted, setIsMounted] = useState(false);

  async function mount(): Promise<void> {
    await Promise.all([SettingsStore.mount(), FilterStore.mount()]);
  }

  useEffect(() => {
    mount().then(() => {
      LayoutStore.main.filter.mount();
      setIsMounted(true);
    });
  }, []);

  return isMounted
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
