import type {
  ApiResult,
  ApiResultAlphabetical,
  ApiResultLogos,
} from 'types/api';

const simpleMethod = (name: 'categories' | 'companies') => (
  async (): Promise<ApiResultAlphabetical> => {
    const res = await fetch(`/api/${name}`);
    const json = await res.json();

    return json;
  }
);

export const api = {
  companies: simpleMethod('companies'),
  categories: simpleMethod('categories'),
  sortBy: async (): Promise<ApiResult> => ({
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
  async list(params: {
    category?: string;
    company?: string;
    multiplier?: number;
    name?: string;
    page?: number;
    sortBy?: string;
  }): Promise<ApiResultLogos> {
    let url = '/api/logos?';

    Object.entries(params).forEach(([key, val]) => {
      if (val) url += `&${key}=${val}`;
    });

    const res = await fetch(url);
    const json = await res.json();

    return json;
  },
};
