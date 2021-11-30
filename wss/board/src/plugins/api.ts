export type LogosResult = {
  data: LogosDataItem[];
  meta: LogosMeta;
};

export type LogosDataItem = {
  category: string;
  company: string;
  content: {
    packages: {
      react: string;
      vue: string;
    };
    snippets: {
      vanilla: string;
    };
  }[];
  date: string;
  id: string;
  name: string;
  src: string;
};

export type LogosMeta = {
  length: {
    current: number;
    total: number;
  };
  page: {
    isNext: boolean;
    next: number;
  };
};

export type SimpleResult = {
  data: {
    [key: string]: {
      id: string;
      name: string;
    }[];
  };
};

const simpleMethod = (name: 'categories' | 'companies') => (
  async (): Promise<SimpleResult> => {
    const res = await fetch(`/api/${name}`);
    const json = await res.json();

    return json;
  }
);

export const api = {
  companies: simpleMethod('companies'),
  categories: simpleMethod('categories'),
  async list(params: {
    category?: string;
    company?: string;
    multiplier?: number;
    name?: string;
    page?: number;
    sortBy?: string;
  }): Promise<LogosResult> {
    let url = '/api/logos?';

    Object.entries(params).forEach(([key, val]) => {
      if (val) url += `&${key}=${val}`;
    });

    const res = await fetch(url);
    const json = await res.json();

    return json;
  },
};
