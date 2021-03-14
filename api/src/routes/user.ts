import * as express from 'express';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';

import { IUser, User } from '../models/user';
import { validateLogin, validateUserRegister } from '../validation/user-routes';

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
			const foundUsername = await User.findOne({username: user.username});
			if (foundUser) {
				// User with that email already exists
				res
					.status(400)
					.send({ email: 'A user with that email already exists' });
			} else if(foundUsername) {
				res
					.status(400)
					.send({ username: 'Username is taken' });
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

						const returnObject = {
							userName: savedUser.username,
							id: savedUser._id
						};

						res.status(200).json(returnObject);
					});
				});
			}
		} catch (e) {
			console.log(e);
			res.status(500).json('Oops something went wrong');
		}
	}
);

userRouter.post(
	'/login',
	async (req: express.Request, res: express.Response) => {
		const userEmail = req.body.email ? req.body.email : '';
		const userPassword = req.body.password ? req.body.password : '';

		const errors = validateLogin({ email: userEmail, password: userPassword });
		if (!_.isEmpty(errors)) {
			return res.status(400).json(errors);
		}

		try {
			const user: IUser = await User.findOne({ email: userEmail });
			if (user) {
				const match = await bcrypt.compare(userPassword, user.password);
				if (match) {
					const payload = { email: userEmail, is: user._id };
					const token = jwt.sign(payload, process.env.jwt_key, {
						expiresIn: 3600,
					});
					res
						.status(200)
						.json({ success: true, token: `Bearer ${token}`, id: user._id });
				} else {
					res.status(401).json({ password: 'password is incorrect' });
				}
			} else {
				res.status(404).send({ email: 'User not found' });
			}
		} catch (e) {
			res.status(500).json('Oops something went wrong');
		}
	}
);

export default userRouter;
