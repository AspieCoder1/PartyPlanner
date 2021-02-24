import userRouter from '../../src/routes/user';
import * as express from 'express';
import * as request from 'supertest';
import { MongoMemoryServer } from "mongodb-memory-server";
import * as mongoose from "mongoose";

const app: express.Application = express();
app.use('/', userRouter);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose
    .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then()
    .catch(() => console.error('Unable to connect to MongoDB'));
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('GET /', () => {
  it('Responds with 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toBe('Hello from the userRouter');
  });
});
