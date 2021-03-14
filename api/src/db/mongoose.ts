import * as mongoose from 'mongoose';

mongoose
	.connect(process.env.DB_URL, { useNewUrlParser: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch(() => console.error('Unable to connect to MongoDB'));
