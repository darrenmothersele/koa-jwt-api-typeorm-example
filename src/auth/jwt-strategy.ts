import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';

export const createJwtStrategy = () => {
  const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };

  return new JwtStrategy(opts, ({ uuid, roles }, done) => {
    done(null, { uuid, roles });
  });
};
