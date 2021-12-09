import { FilterStore } from 'src/modules/filter';
import { LayoutStore } from 'src/modules/layout';
import { SearchStore } from 'src/modules/search';
import { UserStore } from 'src/modules/user';
import { api } from 'src/plugins/api';
import type { ContentStore } from 'types/content';

export function initListRoot(this: ContentStore): void {
  Object.defineProperties(this, {
    list: {
      value: {},
      enumerable: true,
    },
  });

  this.list.upload = async function () {
    const res = await this.fetch();

    this.result.meta.set(res.meta);
    this.result.data.add(res.data);
  };

  this.list.reset = async function () {
    this.result.meta.page.reset();

    const res = await this.fetch(UserStore.multiplier);

    this.result.meta.set(res.meta);
    this.result.data.clear();
    LayoutStore.main.content.toTop();
    this.result.data.add(res.data);
  };

  this.list.fetch = async function (multiplier) {
    const name = SearchStore.value.current;
    const res = await api.list({
      ...Object.fromEntries([
        FilterStore.category,
        FilterStore.company,
        FilterStore.sortBy,
      ].map((pr) => (pr.val.cur ? [pr.id, pr.val.cur.id] : []))),
      ...multiplier ? { multiplier } : {},
      ...name ? { name } : {},
      page: this.result.meta.page.next,
    });

    return res;
  };
}
