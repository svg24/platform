import { api } from 'src/plugins/api';
import { Store } from 'src/store';
import type { ContentStore } from 'types/content';

export function initListRoot(this: ContentStore): void {
  Object.defineProperty(this, 'list', {
    enumerable: true,
    value: {},
  });

  this.list.upload = async function () {
    const res = await this.fetch();

    this.result.meta.set(res.meta);
    this.result.data.add(res.data);
  };

  this.list.reset = async function () {
    this.result.meta.page.reset();

    const res = await this.fetch(
      Store.user.content.list.multiplier.value.current,
    );

    this.result.meta.set(res.meta);
    this.result.data.clear();
    if (Store.layout.main.content.goTop) Store.layout.main.content.goTop();
    this.result.data.add(res.data);
  };

  this.list.fetch = async function (multiplier) {
    const name = Store.search.value.current;
    const res = await api.list({
      ...Object.fromEntries([
        Store.filter.category,
        Store.filter.company,
        Store.filter.sortBy,
      ].map((pr) => (pr.value.current ? [pr.id, pr.value.current.id] : []))),
      ...multiplier ? { multiplier } : {},
      ...name ? { name } : {},
      page: this.result.meta.page.next,
    });

    return res;
  };
}
