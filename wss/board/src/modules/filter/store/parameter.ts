import { api } from 'src/plugins/api';
import { initStoreFormParameter } from 'src/utils';
import type { ApiSimpleIds } from 'types/api';
import type { FilterStore, FilterStoreParametersIds } from 'types/filter';

const methods: { [key in FilterStoreParametersIds]: ApiSimpleIds } = {
  category: 'categories',
  company: 'companies',
  sortBy: 'sortBy',
};

export function initParameter(
  this: FilterStore,
  id: FilterStoreParametersIds,
): void {
  Object.defineProperty(this, id, {
    enumerable: true,
    value: {
      id,
      options: undefined,
      value: {
        _default: undefined,
        _current: undefined,
      },
      fetch: async () => {
        const res = await api[methods[id]]();

        this[id].options = res.data;
        this[id].value._default = res.meta.default;
        this[id].value.current = res.meta.default;
      },
    },
  });

  Object.defineProperty(this[id], 'isApplied', {
    enumerable: true,
    get: () => (this[id].value._default
      ? this[id].value.current?.id !== this[id].value._default?.id
      : !!this[id].value.current),
  });

  initStoreFormParameter.call(this[id]);
}
