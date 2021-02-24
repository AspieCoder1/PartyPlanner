import userRouter from '../../src/routes/user';
import * as express from 'express';
import * as request from 'supertest';

const app: express.Application = express();
app.use('/', userRouter);

describe('GET /', () => {
  it('Responds with 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toBe('Hello from the userRouter');
  });
});
