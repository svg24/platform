export type ApiResultLogos = {
  data: ApiLogosDataItem[];
  meta: ApiLogosMeta;
};

export type ApiLogosDataItem = {
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

export type ApiLogosMeta = {
  length: {
    current: number;
    total: number;
  };
  page: {
    isNext: boolean;
    next: number;
  };
};

export type ApiResult = {
  data: ApiResultDataItem[];
  meta: {
    default: ApiResultDataItem;
  };
};

export type ApiResultDataItem = {
  id: string;
  name: string;
};

export type ApiResultAlphabetical = {
  data: {
    [key: string]: ApiResult['data'];
  };
  meta?: any;
};
