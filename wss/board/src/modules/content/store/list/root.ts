import { api } from 'src/plugins/api';
import { Store as RootStore } from 'src/store';
import type { Store } from 'types/content';

export function initListRoot(this: Store): void {
  Object.defineProperty(this, 'list', {
    enumerable: true,
    value: {},
  });

  this.list.upload = async function () {
    const res = await this.fetch();

    this.response.meta.set(res.meta);
    this.response.data.add(res.data);
  };

  this.list.reset = async function () {
    this.response.meta.page.reset();

    const res = await this.fetch(
      RootStore.user.content.list.multiplier.value.current,
    );

    this.response.meta.set(res.meta);
    this.response.data.clear();
    if (RootStore.layout.main.content.goTop) {
      RootStore.layout.main.content.goTop();
    }
    this.response.data.add(res.data);
  };

  this.list.fetch = async function (multiplier) {
    const name = RootStore.search.value.current;
    const res = await api.list({
      ...Object.fromEntries([
        RootStore.filter.category,
        RootStore.filter.company,
        RootStore.filter.sortBy,
      ].map((pr) => (pr.value.current ? [pr.id, pr.value.current.id] : []))),
      ...multiplier ? { multiplier } : {},
      ...name ? { name } : {},
      page: this.response.meta.page.next,
    });

    return res;
  };
}
