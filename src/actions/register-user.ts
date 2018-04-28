import { Context } from 'koa';
import { Connection } from 'typeorm';
import { User } from '../entity/User';
import * as isEmail from 'validator/lib/isEmail';

const saltRounds = 10;
import { hash } from 'bcrypt';

const emailExists = async (conn: Connection, email) => {
  const user = await conn.getRepository(User).findOne({ email });
  return !!user;
};

export const validEmail = async (ctx, next) => {
  if (!isEmail(ctx.request.body.email)) {
    ctx.status = 400;
    ctx.body = { message: 'Email is invalid' };
    return;
  }
  await next();
};

export const emailNotExists = async (ctx, next) => {
  if (await emailExists(ctx.db, ctx.request.body.email)) {
    ctx.status = 400;
    ctx.body = { message: 'The user already exists' };
    return;
  }
  await next();
};

export const registerUser = async (ctx: Context) => {
  const user = new User();
  user.email = ctx.request.body.email;
  user.emailVerified = false;
  user.hashedPassword = await hash(ctx.request.body.password, saltRounds);

  try {
    const { uuid, email } = await ctx.db.manager.save(user);
    ctx.body = { uuid, email };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { message: err.message };
  }
};
