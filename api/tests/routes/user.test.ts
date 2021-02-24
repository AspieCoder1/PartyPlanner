import * as express from 'express';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import userRouter from '../../src/routes/user';
import { User } from '../../src/models/user';
import '../config/config';

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

afterEach(async () => {
  await User.deleteMany({});
});

describe('GET /', () => {
  it('Responds with 200', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toBe('Hello from the userRouter');
  });
});

describe('POST /register', () => {
  it('Should respond with 200 and correctly register a user', async () => {
    const mockUser = {
      email: 'test@test.com',
      username: 'test',
      password: 'abcdefghht',
    };
    const res = await request(app).post('/register').send(mockUser);
    expect(res.status).toBe(200);
    const foundUser = await User.findOne({ email: mockUser.email });
    expect(foundUser).toBeTruthy();
  });

  it('Should respond with 400 if email is empty', async () => {
    const expectedErrors = {
      email: 'email is required',
    };

    const mockUser = {
      email: '',
      username: 'test',
      password: 'abcdefghht',
    };
    const res = await request(app).post('/register').send(mockUser);
    expect(res.status).toBe(400);
    expect(res.body).toEqual(expectedErrors);
  });

  it('Should respond with 400 if password is empty', async () => {
    const expectedErrors = {
      password: 'password is required',
    };

    const mockUser = {
      email: 'test@test.com',
      username: 'test',
      password: '',
    };
    const res = await request(app).post('/register').send(mockUser);
    expect(res.status).toBe(400);
    expect(res.body).toEqual(expectedErrors);
  });

  it('Should respond with 400 if username is empty', async () => {
    const expectedErrors = {
      username: 'username is required',
    };

    const mockUser = {
      email: 'test@test.com',
      username: '',
      password: 'asddfbsdfdfsgsdfg',
    };
    const res = await request(app).post('/register').send(mockUser);
    expect(res.status).toBe(400);
    expect(res.body).toEqual(expectedErrors);
    const foundUser = await User.findOne({ email: mockUser.email });
    expect(foundUser).toBeFalsy();
  });

  it('Should respond with 400 if email is not provided', async () => {
    const expectedErrors = {
      email: 'email is required',
    };

    const mockUser = {
      username: 'test',
      password: 'abcdefghht',
    };
    const res = await request(app).post('/register').send(mockUser);
    expect(res.status).toBe(400);
    expect(res.body).toEqual(expectedErrors);
  });

  it('Should respond with 400 if password is not provided', async () => {
    const expectedErrors = {
      password: 'password is required',
    };

    const mockUser = {
      email: 'test@test.com',
      username: 'test',
    };
    const res = await request(app).post('/register').send(mockUser);
    expect(res.status).toBe(400);
    expect(res.body).toEqual(expectedErrors);
    const foundUser = await User.findOne({ email: mockUser.email });
    expect(foundUser).toBeFalsy();
  });

  it('Should respond with 400 if username is not provided', async () => {
    const expectedErrors = {
      username: 'username is required',
    };

    const mockUser = {
      email: 'test@test.com',
      password: 'asddfbsdfdfsgsdfg',
    };
    const res = await request(app).post('/register').send(mockUser);
    expect(res.status).toBe(400);
    expect(res.body).toEqual(expectedErrors);
  });

  it('Should respond with 400 if email already exists', async () => {
    const mockUser = {
      email: 'test@test.com',
      username: 'test',
      password: 'abcdefghht',
    };
    const newUser1 = new User(mockUser);
    await newUser1.save();

    const res = await request(app).post('/register').send(mockUser);
    expect(res.status).toBe(400);
  });

  it('Should respond with 400 if email is invalid', async () => {
    const expectedErrors = {
      email: 'invalid email',
    };

    const mockUser = {
      email: 'test',
      username: 'test',
      password: 'abcdefghht',
    };
    const res = await request(app).post('/register').send(mockUser);
    expect(res.status).toBe(400);
    expect(res.body).toEqual(expectedErrors);
  });

  it('Should respond with 400 if username is not alphanumeric', async () => {
    const expectedErrors = {
      username: 'username can only contain letters and numbers',
    };

    const mockUser = {
      email: 'test@test.com',
      username: 'test@',
      password: 'abcdefghht',
    };
    const res = await request(app).post('/register').send(mockUser);
    expect(res.status).toBe(400);
    expect(res.body).toEqual(expectedErrors);
  });

  it('Should respond with 400 if password length < 8', async () => {
    const expectedErrors = {
      password: 'password must be at least 8 characters long',
    };

    const mockUser = {
      email: 'test@test.com',
      username: 'test',
      password: 'abc',
    };
    const res = await request(app).post('/register').send(mockUser);
    expect(res.status).toBe(400);
    expect(res.body).toEqual(expectedErrors);
  });
});

describe('POST /login', () => {
  it('should send 200 if email and password are correct', async () => {
    const mockUser = {
      email: 'test@test.com',
      username: 'test',
      password: 'abcdefghht',
    };
    await request(app).post('/register').send(mockUser);

    const loginUser = {
      email: mockUser.email,
      password: mockUser.password
    };
    const res = await request(app).post('/login').send(loginUser);
    expect(res.status).toBe(200);
  });

  it('should send 404 if email is not found', async () => {
    const loginUser = {
      email: 'test@test.com',
      password: '1234567'
    };
    const res = await request(app).post('/login').send(loginUser);
    expect(res.status).toBe(404);
  })

  it('should send 401 if password is incorrect', async () => {
    const mockUser = {
      email: 'test@test.com',
      username: 'test',
      password: 'abcdefghht',
    };
    await request(app).post('/register').send(mockUser);

    const loginUser = {
      email: mockUser.email,
      password: '12345'
    };
    const res = await request(app).post('/login').send(loginUser);
    expect(res.status).toBe(401);
  })

  it('should send 400 if password is empty', async () => {
    const loginUser = {
      email: 'test@test.com',
      password: ''
    };
    const res = await request(app).post('/login').send(loginUser);
    expect(res.status).toBe(400);
  })

  it('should send 400 if email is empty', async () => {
    const loginUser = {
      email: '',
      password: '1234567'
    };
    const res = await request(app).post('/login').send(loginUser);
    expect(res.status).toBe(400);
  })

  it('should send 400 if password not provided', async () => {
    const loginUser = {
      email: 'test@test.com',
    };
    const res = await request(app).post('/login').send(loginUser);
    expect(res.status).toBe(400);
  })

  it('should send 400 if email is not provided', async () => {
    const loginUser = {
      password: '1234567'
    };
    const res = await request(app).post('/login').send(loginUser);
    expect(res.status).toBe(400);
  })
});
