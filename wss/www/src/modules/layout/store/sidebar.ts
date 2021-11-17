import type { LayoutStore } from '../types';
import { initElementTransitions } from './helpers/transitions';

export const initSidebar = function (this: LayoutStore): void {
  initElementTransitions.call(this, 'sidebar');
};
