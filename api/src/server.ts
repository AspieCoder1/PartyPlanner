import * as express from 'express';
import * as bodyParser from 'body-parser';
import userRouter from './routes/user';
import './db/mongoose';

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/users', userRouter);

app.get('/', (req: express.Request, res: express.Response): void => {
	res.send('Hello world');
});



app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
