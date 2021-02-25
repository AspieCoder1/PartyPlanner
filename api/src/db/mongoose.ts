import * as mongoose from 'mongoose';

mongoose
	.connect(process.env.DB_URL, { useNewUrlParser: true })
	.then()
	.catch(() => console.error('Unable to connect to MongoDB'));
