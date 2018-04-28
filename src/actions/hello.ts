import { Context } from 'koa';

export function hello(ctx: Context) {
  const message = "Hello";
  ctx.body = { message };
}
