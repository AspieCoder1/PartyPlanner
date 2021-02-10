import * as express from 'express';

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
