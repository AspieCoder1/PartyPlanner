import * as express from 'express';

const userRouter: express.Router = express.Router();

userRouter.get('/', (req: express.Request, res: express.Response) => {
  res.status(200);
  res.json('Hello from the userRouter');
});

export default userRouter;
