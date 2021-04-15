import { IImage, Image } from '../../src/models/image';
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
	await Image.deleteMany({});
});

describe('Image model tests', () => {
	it('Should correctly add a image to the db', async () => {
		const newImage = {
			_id: mongoose.Types.ObjectId(),
			partyId: 'testpartyid',
			link: 'testpartylink',
		};
		const image: IImage = new Image(newImage);
		const savedImage = await image.save();
		expect(image).toEqual(savedImage);
		const foundImage = await Image.findById(newImage._id);
		expect(foundImage).toBeTruthy();
	});
});
