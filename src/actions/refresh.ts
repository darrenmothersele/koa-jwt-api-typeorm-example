import { generateToken } from '../utils/generate-token';

export async function refreshToken(ctx) {
  ctx.body = await generateToken(ctx.state.user);
}
