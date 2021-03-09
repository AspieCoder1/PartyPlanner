import * as express from 'express';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import partyRouter from '../../src/routes/party';
import { Party } from '../../src/models/party';
import '../config/config';

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', partyRouter);

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
	await Party.deleteMany({});
});


describe('POST /create', () => {
  it('Should respond with 200 and correctly add a party', async () => {
    const mockParty = {
      name: 'My Party',
      organiser: 'test user',
      description: 'This is a test party',
      location: 'This is a test location',
      date: '2021-04-04',
      ageRate: false,
      time: '11:30',
    };
		const res = await request(app).post('/create').send(mockParty);
		console.log(res);
    expect(res.status).toBe(200);
    const foundParty = await Party.findOne(mockParty);
    expect(foundParty).toBeTruthy();
  });


	it('Should respond with 400 if party name is empty', async () => {
		const expectedErrors = {
			name: 'Party name is required and must be at least 5 characters long',
		};

		const mockParty = {
			_id: mongoose.Types.ObjectId(),
      name: '',
      organiser: 'test user',
      description: 'This is a test party',
      location: 'This is a test location',
      date: '2021-04-04',
      ageRate: false,
      time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);
		expect(res.status).toBe(400);
		expect(res.body).toEqual(expectedErrors);
  });
  
  it('Should respond with 400 if party name is not provided', async () => {
		const expectedErrors = {
			name: 'Party name is required and must be at least 5 characters long',
		};

		const mockParty = {
			_id: mongoose.Types.ObjectId(),
      organiser: 'test user',
      description: 'This is a test party',
      location: 'This is a test location',
      date: '2021-04-04',
      ageRate: false,
      time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);
		expect(res.status).toBe(400);
		expect(res.body).toEqual(expectedErrors);
  });

  it('Should respond with 400 if organiser name is empty', async () => {
		const expectedErrors = {
			organiser : 'An organiser is required and must be at least 5 characters long',
		};

		const mockParty = {
			_id: mongoose.Types.ObjectId(),
      name: 'my party',
      organiser: '',
      description: 'This is a test party',
      location: 'This is a test location',
      date: '2021-04-04',
      ageRate: false,
      time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);
		expect(res.status).toBe(400);
		expect(res.body).toEqual(expectedErrors);
  });

  it('Should respond with 400 if organiser name is not provided', async () => {
		const expectedErrors = {
			organiser : 'An organiser is required and must be at least 5 characters long',
		};

		const mockParty = {
			_id: mongoose.Types.ObjectId(),
      name: 'my party',
      description: 'This is a test party',
      location: 'This is a test location',
      date: '2021-04-04',
      ageRate: false,
      time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);
		expect(res.status).toBe(400);
		expect(res.body).toEqual(expectedErrors);
  });


  it('Should respond with 400 if description is empty', async () => {
		const expectedErrors = {
			description : 'A party description is required and must be at least 7 characters long',
		};

		const mockParty = {
			_id: mongoose.Types.ObjectId(),
      name: 'my party',
      organiser: 'test user',
      description: '',
      location: 'This is a test location',
      date: '2021-04-04',
      ageRate: false,
      time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);
		expect(res.status).toBe(400);
		expect(res.body).toEqual(expectedErrors);
  });  


  it('Should respond with 400 if description is not provided', async () => {
		const expectedErrors = {
			description : 'A party description is required and must be at least 7 characters long',
		};

		const mockParty = {
			_id: mongoose.Types.ObjectId(),
      name: 'my party',
      organiser: 'test user',
      location: 'This is a test location',
      date: '2021-04-04',
      ageRate: false,
      time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);
		expect(res.status).toBe(400);
		expect(res.body).toEqual(expectedErrors);
  });
  

  it('Should respond with 400 if location is empty', async () => {
		const expectedErrors = {
			location : 'A party location is required',
		};

		const mockParty = {
			_id: mongoose.Types.ObjectId(),
      name: 'my party',
      organiser: 'test user',
      description: 'This is a test party',
      location: '',
      date: '2021-04-04',
      ageRate: false,
      time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);
		expect(res.status).toBe(400);
		expect(res.body).toEqual(expectedErrors);
  }); 

  it('Should respond with 400 if location is not provided', async () => {
		const expectedErrors = {
			location : 'A party location is required',
		};

		const mockParty = {
			_id: mongoose.Types.ObjectId(),
      name: 'my party',
      organiser: 'test user',
      description: 'This is a test party',
      date: '2021-04-04',
      ageRate: false,
      time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);
		expect(res.status).toBe(400);
		expect(res.body).toEqual(expectedErrors);
  }); 

  it('Should respond with 400 if date is empty', async () => {
		const expectedErrors = {
			date : 'A date is required',
		};

		const mockParty = {
			_id: mongoose.Types.ObjectId(),
      name: 'my party',
      organiser: 'test user',
      description: 'This is a test party',
      location: 'this is a test location',
      date: '',
      ageRate: false,
      time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);
		expect(res.status).toBe(400);
		expect(res.body).toEqual(expectedErrors);
  }); 


  it('Should respond with 400 if date is not provided', async () => {
		const expectedErrors = {
			date : 'A date is required',
		};

		const mockParty = {
			_id: mongoose.Types.ObjectId(),
      name: 'my party',
      organiser: 'test user',
      description: 'This is a test party',
      location: 'this is a test location',
      ageRate: false,
      time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);
		expect(res.status).toBe(400);
		expect(res.body).toEqual(expectedErrors);
  });
  

  it('Should respond with 400 if time is empty', async () => {
		const expectedErrors = {
			time : 'A time is required',
		};

		const mockParty = {
			_id: mongoose.Types.ObjectId(),
      name: 'my party',
      organiser: 'test user',
      description: 'This is a test party',
      location: 'this is a test location',
      date: '2021-04-04',
      ageRate: false,
      time: '',
		};
		const res = await request(app).post('/create').send(mockParty);
		expect(res.status).toBe(400);
		expect(res.body).toEqual(expectedErrors);
  }); 


  it('Should respond with 400 if time is not provided', async () => {
		const expectedErrors = {
			time : 'A time is required',
		};

		const mockParty = {
			_id: mongoose.Types.ObjectId(),
      name: 'my party',
      organiser: 'test user',
      description: 'This is a test party',
      location: 'this is a test location',
      date: '2021-04-04',
      ageRate: false,
		};
		const res = await request(app).post('/create').send(mockParty);
		expect(res.status).toBe(400);
		expect(res.body).toEqual(expectedErrors);
  });
});


describe('GET /edit/:id', () => {
	it('Responds with 200 and get a party', async () => {
		const mockParty = {
			_id: new mongoose.Types.ObjectId(),
      name: 'My Party',
      organiser: 'test user',
      description: 'This is a test party',
      location: 'This is a test location',
      date: '2021-04-04',
      ageRate: false,
      time: '11:30',
    };
		const res = await request(app).post('/create').send(mockParty);
		const delRes = await request(app).get(`/edit/${mockParty._id}`);
		console.log(delRes.body);
		expect(delRes.status).toBe(200);
	});
});
