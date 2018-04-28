import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as logger from 'koa-morgan';
import * as bodyParser from 'koa-bodyparser';

import * as passport from 'koa-passport';
import { createLocalStrategy } from './auth/local-strategy';

import { createRouter } from './router';
import { Connection } from 'typeorm';
import { User } from './entity/User';
import { createJwtStrategy } from './auth/jwt-strategy';

export const createApp = (conn: Connection) => {

  passport.use(createLocalStrategy(conn.getRepository(User)));
  passport.use(createJwtStrategy());

  const router = createRouter();

  const app = new Koa();
  app.context.db = conn;

  app
    .use(logger('combined'))
    .use(bodyParser())
    .use(passport.initialize())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

  return app;
};
