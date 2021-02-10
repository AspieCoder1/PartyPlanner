import * as mongoose from 'mongoose';

// allows promises to be used with mongoose operations
(<any>mongoose).Promise = global.Promise;

mongoose
    .connect(process.env.DB_URL, { useNewUrlParser: true })
    .then()
    .catch(() => console.error('Unable to connect to MongoDB'));

export { mongoose };