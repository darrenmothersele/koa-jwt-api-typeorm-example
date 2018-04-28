
export function privateData(ctx) {
  const { uuid, roles } = ctx.state.user;
  const message = "This is private data";
  ctx.body = { message, uuid, roles };
}
