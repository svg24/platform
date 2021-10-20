import db from 'mongoose';
import { DB_SCHEMA_STRING_REQUIRED } from '../constants/db';

export const logoScheme = new db.Schema<Logo>({
  name: DB_SCHEMA_STRING_REQUIRED,
  slug: DB_SCHEMA_STRING_REQUIRED,
  category: DB_SCHEMA_STRING_REQUIRED,
  date: DB_SCHEMA_STRING_REQUIRED,
  src: DB_SCHEMA_STRING_REQUIRED,
});
