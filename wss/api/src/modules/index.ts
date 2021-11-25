import { logos } from './logos';
import { createSimple } from './simple';

export { logos };

export const categories = createSimple({
  collection: 'categories',
  name: 'CategoriesItem',
});
export const companies = createSimple({
  collection: 'companies',
  name: 'CompaniesItem',
});
