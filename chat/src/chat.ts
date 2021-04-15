import { Document, model, Model, Schema } from 'mongoose';

export interface ChatModel extends Document {
	userID: string;
	message: string;
	partyID: string;
}

const chatScheme: Schema = new Schema({
	userID: {
		type: String,
	},
	message: {
		type: String,
	},
	partyID: {
		type: String,
	},
});

export const Chat: Model<ChatModel> = model('chat', chatScheme);
