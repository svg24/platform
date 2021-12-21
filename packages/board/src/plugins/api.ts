import type Api from 'types/api';

const sortBy = {
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
};

async function getResponse<T>(method: string): Promise<T> {
  const res = await fetch(`/api/v1/${method}`);
  const json = await res.json();
  return json;
}

export const api: typeof Api = {
  async sortBy() {
    return sortBy;
  },
  async categories() {
    return getResponse('categories');
  },
  async companies() {
    return getResponse('companies');
  },
  async list(params) {
    let url = 'list?';

    Object.entries(params).forEach(([key, value]) => {
      if (value) url += `&${key}=${value}`;
    });

    return getResponse(url);
  },
  async item({ id }) {
    return getResponse(`item?id=${id}`);
  },
};
