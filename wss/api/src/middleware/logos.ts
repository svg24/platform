import { RouterContext } from '@koa/router';
import { Next } from 'koa';
import { LogoModel } from '../models';

export const list = async (ctx: RouterContext, next: Next): Promise<void> => {
  const logos = await LogoModel.find();

  ctx.body = logos;

  next();
};
