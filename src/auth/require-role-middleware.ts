
export const requireRole = (role: string) => (ctx, next) => {
  const { roles } = ctx.state.user;
  if (roles.includes(role)) {
    next(ctx);
  }
};
