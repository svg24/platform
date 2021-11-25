import type { Module } from '../../types/module';

export interface SimpleModule extends Module<SimpleModuleItem> {}

export type SimpleModuleItem = {
  id: string;
  name: string;
};
