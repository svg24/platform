import type {
  ApiItem,
  ApiList,
  ApiSimple,
  ApiSimpleAlphabetical,
} from 'types/api';

const simpleMethod = (name: 'categories' | 'companies') => (
  async (): Promise<ApiSimpleAlphabetical> => {
    const res = await fetch(`/api/v1/${name}`);
    const json = await res.json();

    return json;
  }
);

export const api = {
  sortBy: async (): Promise<ApiSimple> => ({
    data: [{
      id: 'date',
      name: 'Date',
    }, {
      id: 'name',
      name: 'Name',
    }],
    meta: {
      default: {
        id: 'date',
        name: 'Date',
      },
    },
  }),
  categories: simpleMethod('categories'),
  companies: simpleMethod('companies'),
  async list(params: {
    category?: string;
    company?: string;
    multiplier?: number;
    name?: string;
    page?: number;
    sortBy?: string;
  }): Promise<ApiList> {
    let url = '/api/v1/list?';

    Object.entries(params).forEach(([key, val]) => {
      if (val) url += `&${key}=${val}`;
    });

    const res = await fetch(url);
    const json = await res.json();

    return json;
  },
  async item({ id }: { id: string }): Promise<ApiItem> {
    const res = await fetch(`/api/v1/item?id=${id}`);
    const json = await res.json();

    return json;
  },
};
