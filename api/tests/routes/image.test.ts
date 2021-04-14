import * as express from 'express';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import imageRouter from '../../src/routes/image';
import { Image } from '../../src/models/image';
import '../config/config';

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', imageRouter);

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
	await Image.deleteMany({});
});



describe('POST /uploadimage/:uid/:pid/:link', () => {
	it('Should respond with 200 and correctly add a image', async () => {

		const res = await request(app).post('/uploadimage/test123/test456/test789').send({});
		expect(res.status).toBe(200);

	});
});


describe('GET /party-image/:id', () => {

	it('should return 404 if a party has no images', async () => {
		const { status } = await request(app).get('/party-image/3frgtthy');
		expect(status).toBe(404);
	});

	it('should return 200 and party images if successful', async () => {

        const  {body}  = await request(app).post('/uploadimage/test123/test456/test789').send({});
        expect(body).toBe(200);
		const { status } = await request(app).get(
			`/party-image/${body.partyId}`
		);
		expect(status).toBe(200);

		expect(body.length).toBe(1);
		expect(body.partyId).toBe('test456');
	});
});

describe('DELETE /:id', () => {
	it('should successfully delete a image', async () => {

        const { body } = await request(app).post('/uploadimage/test123/test456/test789').send({});
        expect(body).toBe(200);
		const { status } = await request(app).del(`/${body.id}`);
		expect(status).toBe(200);

		const foundImage = await Image.findById(body.id);
		expect(foundImage).toBeNull();
	});

	it('should give a 500 if id is invalid', async () => {
		const { status, body } = await request(app).del('/egffgfgh');
		expect(status).toBe(500);
		expect(body).toBe('Oops something went wrong');
	});

	it('should return 404 if id is not found', async () => {
		const id = new mongoose.Types.ObjectId();
		const { status } = await request(app).del(`/${id}`);
		expect(status).toBe(404);
	});
});



