import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';

import { IUser, User } from '../models/user';
import validateUserRegister from '../validation/register';

const userRouter: express.Router = express.Router();

userRouter.get('/', (req: express.Request, res: express.Response) => {
  res.status(200);
  res.json('Hello from the userRouter');
});

userRouter.post(
  '/register',
  async (req: express.Request, res: express.Response) => {
    req.body.email = req.body.email ? req.body.email : '';
    req.body.password = req.body.password ? req.body.password : '';
    req.body.username = req.body.username ? req.body.username : '';
    const user = {
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    };

    const errors = validateUserRegister(user);
    if (!_.isEmpty(errors)) {
      return res.status(400).json(errors);
    }

    try {
      const foundUser = await User.findOne({ email: user.email });
      if (foundUser) {
        // User with that email already exists
        res
          .status(400)
          .send({ email: 'A user with that email already exists' });
      } else {
        const newUser: IUser = new User({
          email: user.email,
          password: user.password,
          username: user.username,
        });

        // Hash and salt password
        await bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, async (err, hash) => {
            // Store hash in your password DB.
            if (err) throw err;
            newUser.password = hash;
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
          });
        });
      }
    } catch (e) {
      res.status(500).json('Oops something went wrong');
    }
  }
);

export default userRouter;
