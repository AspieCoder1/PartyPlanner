import * as express from 'express';
import * as bcrypt from 'bcrypt';

import { IUser, User } from '../models/user';

const userRouter: express.Router = express.Router();

userRouter.get('/', (req: express.Request, res: express.Response) => {
  res.status(200);
  res.json('Hello from the userRouter');
});

userRouter.post(
  '/register',
  async (req: express.Request, res: express.Response) => {
    const user = {
      email: req.body.email ? req.body.email : '',
      password: req.body.email ? req.body.email : '',
      username: req.body.username ? req.body.username : '',
    };

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
      console.log('Something went wrong!');
    }
  }
);

export default userRouter;
