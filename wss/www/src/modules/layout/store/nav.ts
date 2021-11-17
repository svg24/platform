import type { LayoutStore } from '../types';
import { initElementTransitions } from './helpers/transitions';

export const initNav = function (this: LayoutStore): void {
  initElementTransitions.call(this, 'nav');
};
