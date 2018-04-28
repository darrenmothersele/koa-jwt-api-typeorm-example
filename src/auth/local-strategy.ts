import { compare as compareHash } from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Repository } from 'typeorm';
import { User } from '../entity/User';


export const createLocalStrategy = (userRepo: Repository<User>) =>
  new LocalStrategy({ session: false, usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await userRepo.findOne({ email });
      if (await compareHash(password, user.hashedPassword)) {
        done(null, { ...user, hashedPassword: undefined });
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err);
    }
  });
