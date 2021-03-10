import { Party, IParty } from '../../src/models/party';
import { ObjectId } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';

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

describe('Party model tests', () => {
	it('Should correctly add a party to the db', async () => {
		const newParty = {
			_id: new ObjectId(),
			name: 'My Party',
			organiser: 'test user',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			time: '11:30',
			publicParty: true,
		};

		const party: IParty = new Party(newParty);
		const savedParty = await party.save();
		expect(party).toEqual(savedParty);
		const foundParty = await Party.findById(newParty._id);
		expect(foundParty).toBeTruthy();
	});

	it('Should throw error if party name is not provided', async () => {
		const newParty = {
			organiser: 'test user',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			time: '11:30',
		};
		let error;

		try {
			const party: IParty = new Party(newParty);
			await party.validate();
		} catch (e) {
			error = e;
		}
		expect(error).not.toBeNull();
		expect(error.errors.name.properties.message).toBe(
			'A party name is required'
		);
	});

	it('should raise error if party name is less than 5 characters', async () => {
		const newParty = {
			name: 'test',
			organiser: 'test user',
			description: 'this is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			time: '11:30',
		};

		let error;

		try {
			const party: IParty = new Party(newParty);
			await party.validate();
		} catch (e) {
			error = e;
		}

		expect(error.errors.name.message).toEqual(
			'Party name length needs to be atleast 5'
		);
	});

	it('Should throw error if organiser is not provided', async () => {
		const newParty = {
			name: 'My Party',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			time: '11:30',
		};
		let error;

		try {
			const party: IParty = new Party(newParty);
			await party.validate();
		} catch (e) {
			error = e;
		}
		expect(error).not.toBeNull();
		expect(error.errors.organiser.properties.message).toBe(
			'An organiser is required'
		);
	});

	it('Should throw error if location is not provided', async () => {
		const newParty = {
			name: 'My Party',
			organiser: 'test user',
			description: 'This is a test party',
			date: '2021-04-04',
			ageRate: false,
			time: '11:30',
		};
		let error;

		try {
			const party: IParty = new Party(newParty);
			await party.validate();
		} catch (e) {
			error = e;
		}
		expect(error).not.toBeNull();
		expect(error.errors.location.properties.message).toBe(
			'A location is required'
		);
	});

	it('Should throw error if date is not provided', async () => {
		const newParty = {
			name: 'My Party',
			organiser: 'test user',
			description: 'This is a test party',
			location: 'This is a test location',
			ageRate: false,
			time: '11:30',
		};
		let error;

		try {
			const party: IParty = new Party(newParty);
			await party.validate();
		} catch (e) {
			error = e;
		}
		expect(error).not.toBeNull();
		expect(error.errors.date.properties.message).toBe('A Date is required');
	});

	it('Should throw error if date is invalid provided', async () => {
		const newParty = {
			name: 'My Party',
			organiser: 'test user',
			description: 'This is a test party',
			location: 'This is a test location',
			date: 'next week',
			ageRate: false,
			time: '11:30',
		};
		let error;

		try {
			const party: IParty = new Party(newParty);
			await party.validate();
		} catch (e) {
			error = e;
		}
		expect(error).not.toBeNull();
	});

	it('Should throw error if time is not provided', async () => {
		const newParty = {
			name: 'My Party',
			organiser: 'test user',
			description: 'This is a test party',
			location: 'This is a test location',
			ageRate: false,
			date: '2021-04-04',
		};
		let error;

		try {
			const party: IParty = new Party(newParty);
			await party.validate();
		} catch (e) {
			error = e;
		}
		expect(error).not.toBeNull();
		expect(error.errors.time.properties.message).toBe('A Time is required');
	});

	it('should throw error if description is empty string', async () => {
		const newParty = {
			name: 'My Party',
			organiser: 'test user',
			description: '',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			time: '11:30',
		};
		let error;

		try {
			const party: IParty = new Party(newParty);
			await party.validate();
		} catch (e) {
			error = e;
		}
		expect(error).not.toBeNull();
		expect(error.errors.description.properties.message).toBe(
			'A description is required'
		);
	});

	it('should raise error if description is less than 7 characters', async () => {
		const newParty = {
			name: 'My Party',
			organiser: 'test user',
			description: 'party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			time: '11:30',
		};

		let error;

		try {
			const party: IParty = new Party(newParty);
			await party.validate();
		} catch (e) {
			error = e;
		}

		expect(error.errors.description.message).toEqual(
			'Description length needs to be atleast 7'
		);
	});

	it('Should save user for DB if attendees Ids are set', async () => {
		const newParty = {
			_id: new ObjectId(),
			name: 'My Party',
			organiser: 'test user',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			time: '11:30',
			attendeesID: [new ObjectId(), new ObjectId(), new ObjectId()],
		};

		const party: IParty = new Party(newParty);
		const savedParty = await party.save();
		expect(party).toEqual(savedParty);

		const foundParty = await Party.findById(newParty._id).lean();
		expect(foundParty).toBeTruthy();
		expect(foundParty.attendeesID).toStrictEqual(newParty.attendeesID);
	});

	it('Should save user for DB if todo list is set', async () => {
		const newParty = {
			_id: new ObjectId(),
			name: 'My Party',
			organiser: 'test user',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			ageRate: false,
			time: '11:30',
			todoID: 'todo1',
		};

		const party: IParty = new Party(newParty);
		const savedParty = await party.save();
		expect(party).toEqual(savedParty);

		const foundParty = await Party.findById(newParty._id);
		expect(foundParty).toBeTruthy();
		expect(foundParty.todoID).toBe(newParty.todoID);
	});
});
