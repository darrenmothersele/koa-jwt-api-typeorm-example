import * as Router from 'koa-router';
import { localAuth } from './auth/local-middleware';
import { authenticate } from './actions/authenticate';
import { hello } from './actions/hello';
import { emailNotExists, registerUser, validEmail } from './actions/register-user';
import { jwtAuth } from './auth/jwt-middleware';
import { privateData } from './actions/private-data';
import { refreshToken } from './actions/refresh';
import { requireRole } from './auth/require-role-middleware';


export const createRouter = () => {

  const router = new Router();

  // Public endpoints
  router.get('/', hello);
  router.post('/register', validEmail, emailNotExists, registerUser);

  // Local auth (username/password)
  router.post('/authenticate', localAuth, authenticate);

  // JWT protected
  router.get('/refresh-token', jwtAuth, refreshToken);

  // ROLE_ADMIN only
  router.get('/private', jwtAuth, requireRole('ROLE_ADMIN'), privateData);

  return router;
};
