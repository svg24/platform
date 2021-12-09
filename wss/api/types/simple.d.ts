import type { Module } from 'types/module';

export interface SimpleModule extends Module<SimpleModuleItem> {}

type SimpleModuleItem = {
  id: string;
  name: string;
};
