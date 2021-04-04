import * as express from 'express';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import taskRouter from '../../src/routes/task';
import { Task } from '../../src/models/task';
import '../config/config';

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', taskRouter);

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
	await Task.deleteMany({});
});

describe('POST /create', () => {
	it('should correctly create a task', async () => {
		const taskToAdd = {
			taskname: 'test task name',
			taskdesc: 'task description',
			taskdue: '2022-12-04',
			taskcreator: 'TestUser',
		};

		const { status, body } = await request(app).post('/create').send(taskToAdd);
		expect(status).toBe(200);

		const foundTask = await Task.findById(body.id);
		expect(foundTask.taskname).toBe(taskToAdd.taskname);
		expect(foundTask.taskcreator).toBe(taskToAdd.taskcreator);
	});
});

describe('GET /my-tasks/:id', () => {
	it('should return 404 if a user has not tasks', async () => {
		const { status } = await request(app).get('/my-tasks/3frgtthy');
		expect(status).toBe(404);
	});

	it('should return 200 and users tasks if successful', async () => {
		const taskToAdd = {
			taskname: 'test task name',
			taskdesc: 'task description',
			taskdue: '2022-12-04',
			taskcreator: 'TestUser',
		};

		await new Task(taskToAdd).save();

		const { status, body } = await request(app).get(
			`/my-tasks/${taskToAdd.taskcreator}`
		);
		expect(status).toBe(200);

		const [task] = body;
		expect(body.length).toBe(1);
		expect(task.taskcreator).toBe(taskToAdd.taskcreator);
	});
});

describe('DELETE /:id', () => {
	it('should successfully delete a task', async () => {
		const taskToAdd = {
			taskname: 'test task name',
			taskdesc: 'task description',
			taskdue: '2022-12-04',
			taskcreator: 'TestUser',
		};

		const { body } = await request(app).post('/create').send(taskToAdd);
		const { status } = await request(app).del(`/${body.id}`);
		expect(status).toBe(200);

		const foundTask = await Task.findById(body.id);
		expect(foundTask).toBeNull();
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

describe('PATCH /update/:id', () => {
	it('should successfully update a task', async () => {
		const taskToAdd = {
			taskname: 'test task name',
			taskdesc: 'task description',
			taskdue: '2022-12-04',
			taskcreator: 'TestUser',
		};

		const updates = {
			taskcompleted: true,
		};

		const res = await request(app).post('/create').send(taskToAdd);
		const { id } = res.body;

		const { status, body } = await request(app)
			.patch(`/update/${id}`)
			.send({ updates });
		expect(status).toBe(200);
		expect(body.taskcompleted).toBeTruthy();
	});

	it('should send 500 if id is invalid', async () => {
		const { status } = await request(app).patch('/update/242442').send({});
		expect(status).toBe(500);
	});

	it('should send 404 if id not found', async () => {
		const id = new mongoose.Types.ObjectId();
		const { status } = await request(app).patch(`/update/${id}`).send({});
		expect(status).toBe(404);
	});
});
