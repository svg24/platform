import { Schema } from 'mongoose';
import { SCHEMA_STRING_REQUIRED } from '../constants';

export const logoScheme = new Schema<Logo>({
  name: SCHEMA_STRING_REQUIRED,
  slug: SCHEMA_STRING_REQUIRED,
  category: SCHEMA_STRING_REQUIRED,
  date: SCHEMA_STRING_REQUIRED,
  src: SCHEMA_STRING_REQUIRED,
});
