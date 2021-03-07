import { Schema, Document, Model, model } from 'mongoose';
import validator from 'validator';

export interface IParty extends Document {
	name: string;
	organiser: string;
	description: string;
	location: string;
	date: string;
	time: string;
	ageRate: boolean;
	attendeesID?: string[];
	todoID?: string;
	publicParty?: boolean;
}

const partySchema: Schema = new Schema({
	name: {
		type: String,
		trim: true,
		minlength: [5, 'Party name length needs to be atleast 5'],
		required: [true, 'A party name is required'],
	},
	organiser: {
		type: String,
		trim: true,
		required: [true, 'An organiser is required'],
	},
	description: {
		type: String,
		trim: true,
		minlength: [7, 'Description length needs to be atleast 7'],
		required: [true, 'A description is required'],
	},
	location: {
		type: String,
		trim: true,
		required: [true, 'A location is required'],
	},
	date: {
		type: Date,
		required: [true, 'A Date is required'],
		validate: {
			validator: validator.isDate,
			message: 'Invalid Date',
		},
	},
	time: {
		type: String,
		trim: true,
		required: [true, 'A Time is required'],
	},
	ageRate: {
		type: Boolean,
		required: [true, 'An age rating is required'],
	},
	attendeesID: {
		type: [Schema.Types.ObjectId],
		required: false,
		ref: 'User',
		default: [],
	},
	todoID: {
		type: String,
		required: false,
		ref: 'Todo',
	},
	publicParty: {
		type: Boolean,
		required: false,
		default: false,
	},
});

export const Party: Model<IParty> = model('party', partySchema);
