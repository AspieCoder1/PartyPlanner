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
			organiser:
				'An organiser is required and must be at least 5 characters long',
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
			organiser:
				'An organiser is required and must be at least 5 characters long',
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
			description:
				'A party description is required and must be at least 7 characters long',
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
			description:
				'A party description is required and must be at least 7 characters long',
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
			location:
				'A party location is required and must be at least 5 characters long',
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
			location:
				'A party location is required and must be at least 5 characters long',
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
			date: 'A date is required',
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
			date: 'A date is required',
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
			time: 'A time is required',
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
			time: 'A time is required',
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

describe('DELETE /:id', () => {
	it('Responds with 200 and delete a party', async () => {
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
		const delRes = await request(app).delete(`/${res.body._id}`);
		expect(delRes.status).toBe(200);
	});

	it('Responds with 400 and saw the party does not exist', async () => {
		const testId = new mongoose.Types.ObjectId();
		const res = await request(app).delete(`/${testId}`);
		expect(res.status).toBe(400);
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
		const delRes = await request(app).get(`/edit/${res.body._id}`);
		expect(delRes.status).toBe(200);
	});

	it('Responds with 400 and saw the party does not exist', async () => {
		const testId = new mongoose.Types.ObjectId();
		const res = await request(app).get(`/edit/${testId}`);
		expect(res.status).toBe(400);
	});
});

describe('GET /my-parties/:id', () => {
	it('Responds with 200 and get parties that they are the organiser of', async () => {
		const userID = 'johnSmith1';
		const mockParty = {
			_id: new mongoose.Types.ObjectId(),
			name: 'My Party',
			organiser: 'johnSmith1',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			attendeesID: [userID],
			time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);
		const delRes = await request(app)
			.get('/my-parties/johnSmith1')
			.send({ userID: 'johnSmith1' });
		expect(delRes.status).toBe(200);
	});

	it('Responds with 200 and get parties that they are part of', async () => {
		const userID = 'johnSmith1';
		const mockParty = {
			_id: new mongoose.Types.ObjectId(),
			name: 'My Party',
			organiser: 'adamsmith',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			attendeesID: ['adamsmith', 'johnSmith1', 'tomas'],
			time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);
		const delRes = await request(app).get('/my-parties/johnSmith1');
		expect(delRes.status).toBe(200);
	});

	it('Responds with 400 and return that they have no parties', async () => {
		const userID = 'johnSmith1';
		const mockParty = {
			_id: new mongoose.Types.ObjectId(),
			name: 'My Party',
			organiser: 'adamsmith',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			attendeesID: ['adamsmith'],
			time: '11:30',
		};

		await request(app).post('/create').send(mockParty);
		const delRes = await request(app).get('/my-parties/johnSmith1');
		expect(delRes.status).toBe(400);
	});
});

describe('POST /join/:id', () => {
	it('Respond with 200 and add attendee to party successfully', async () => {
		const mockParty = {
			_id: new mongoose.Types.ObjectId(),
			name: 'My Party',
			organiser: 'Test User',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);
		const delRes = await request(app)
			.post(`/join/${res.body._id}`)
			.send({ attenderID: 'johnSmith1' });
		expect(delRes.status).toBe(200);
	});

	it('Respond with 400 since party does not exists', async () => {
		const userID = 'johnSmith1';
		const mockParty = {
			_id: new mongoose.Types.ObjectId(),
			name: 'My Party',
			organiser: 'Test User',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			time: '11:30',
		};
		const partyID = new mongoose.Types.ObjectId();
		await request(app).post('/create').send(mockParty);
		const delRes = await request(app)
			.post(`/join/${partyID}`)
			.send({ attenderID: userID });
		expect(delRes.status).toBe(400);
	});
});

describe('GET /public-parties', () => {
	it('Responds with 200 and return public parties', async () => {
		const mockParty = {
			_id: new mongoose.Types.ObjectId(),
			name: 'My Party',
			organiser: 'Test User',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			time: '11:30',
			publicParty: true,
		};
		await request(app).post('/create').send(mockParty);
		const delRes = await request(app).get('/public-parties');
		expect(delRes.status).toBe(200);
	});
});

describe('GET /invited-parties/:id', () => {
	it('Responds with 200 and return invited parties', async () => {
		const mockParty = {
			_id: new mongoose.Types.ObjectId(),
			name: 'My Party',
			organiser: 'Test User',
			description: 'This is a test party',
			location: 'This is a test location  ',
			date: '2021-04-04',
			ageRate: false,
			time: '11:30',
			publicParty: true,
		};
		const res = await request(app).post('/create').send(mockParty);
		await request(app)
			.post(`/join/${res.body._id}`)
			.send({ attenderID: 'johnSmith1' });
		const IDtoFind = 'johnSmith1';
		const delRes = await request(app).get(`/invited-parties/${IDtoFind}`);
		expect(delRes.status).toBe(200);
	});

	it('Responds with 400 and return no invited parties', async () => {
		const IDtoFind = 'johnSmith1';
		const delRes = await request(app).get(`/invited-parties/${IDtoFind}`);
		expect(delRes.status).toBe(400);
	});
});

describe('PATCH /update/:id', () => {
	it('Responds with 200 and update the party', async () => {
		const userID = 'johnSmith1';
		const partyID = new mongoose.Types.ObjectId();
		const mockParty = {
			name: 'My Party',
			organiser: 'johnSmith1',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			attendeesID: [userID],
			time: '11:30',
		};

		const updates = {
			name: 'My updated Party',
			organiser: 'johnSmith1',
			description: 'This is an updated test party',
			location: 'This is an updated test location',
			date: '2021-04-04',
			ageRate: false,
			attendeesID: [userID],
			time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);

		const delRes = await request(app)
			.patch(`/update/${res.body._id}`)
			.send({updates});
		expect(delRes.status).toBe(200);
		expect(delRes.body.name).toBe(updates.name);
  });
  

  it('Responds with 404 and return that the party does not exist', async () => {
		const userID = 'johnSmith1';
		const partyID = new mongoose.Types.ObjectId();
		const mockParty = {
			name: 'My Party',
			organiser: 'johnSmith1',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			attendeesID: [userID],
			time: '11:30',
		};

		const updates = {
			name: 'My updated Party',
			organiser: 'johnSmith1',
			description: 'This is an updated test party',
			location: 'This is an updated test location',
			date: '2021-04-04',
			ageRate: false,
			attendeesID: [userID],
			time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);
    const newID = new mongoose.Types.ObjectId();
		const delRes = await request(app)
			.patch(`/update/${newID}`)
      .send({ updates });
		expect(delRes.status).toBe(400);
	});


  it('Responds with 400 and return that the party has not passed validation', async () => {
		const userID = 'johnSmith1';
		const partyID = new mongoose.Types.ObjectId();
		const mockParty = {
			name: 'My Party',
			organiser: 'johnSmith1',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			attendeesID: [userID],
			time: '11:30',
		};

		const updates = {
			name: '',
			organiser: 'johnSmith1',
			description: 'Thi',
			location: 'This is an updated test location',
			date: '2021-04-04',
			ageRate: false,
			attendeesID: [userID],
			time: '11:30',
		};
		const res = await request(app).post('/create').send(mockParty);
		const delRes = await request(app)
			.patch(`/update/${res.body.id}`)
      .send({ updates });
		expect(delRes.status).toBe(400);
	});


});
