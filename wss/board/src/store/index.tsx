import { createContext, useContext } from 'react';
import { BagStore } from 'src/modules/bag';
import { ContentStore } from 'src/modules/content';
import { FilterStore } from 'src/modules/filter';
import { LayoutStore } from 'src/modules/layout';
import { SearchStore } from 'src/modules/search';
import { SettingsStore } from 'src/modules/settings';
import { UserStore } from 'src/modules/user';
import type { Store as IStore } from 'types/store';

const Store = {
  bag: BagStore,
  content: ContentStore,
  filter: FilterStore,
  layout: LayoutStore,
  search: SearchStore,
  settings: SettingsStore,
  user: UserStore,
};
const storeContext = createContext(Store);
const StoreProvider = storeContext.Provider;

function useStore(): IStore {
  const context = useContext(storeContext);
  return context;
}

export {
  Store,
  StoreProvider,
  useStore,
};
