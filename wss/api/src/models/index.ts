import db from 'mongoose';
import { DB_MODEL_NAMES } from '../constants/db';
import { logoScheme } from '../schemes';

export const LogoModel = db.model<Logo>(DB_MODEL_NAMES.LOGO, logoScheme);
