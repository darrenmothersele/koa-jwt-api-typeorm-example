import { Context } from 'koa';
import { generateToken } from '../utils/generate-token';

export async function authenticate(ctx: Context) {
  ctx.body = await generateToken(ctx.state.user);
}
