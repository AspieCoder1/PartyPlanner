import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { User } from '../models/user';

interface Iopts {
  secretOrKey: string;
  jwtFromRequest: JwtFromRequestFunction;
}

const opts: Iopts = {
  secretOrKey: `${process.env.jwt_key}`,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

export const getStrategy = (): Strategy => {
  return new Strategy(opts, (jwt, done: Function) => {
    User.findOne({ email: jwt.email })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => done(err, false));
  });
};
