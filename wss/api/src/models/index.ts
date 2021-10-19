import { model } from 'mongoose';
import { MODEL_NAMES } from '../constants';
import { logoScheme } from '../schemes';

export const LogoModel = model<Logo>(MODEL_NAMES.LOGO, logoScheme);
