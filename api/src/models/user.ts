import { Schema, Document, ObjectId, Model, model } from 'mongoose';
import validator from 'validator';

export interface IUser extends Document {
	email: string;
	password: string;
	username: string;
	phone_num?: string;
	groups: ObjectId[];
	dietary_requirements?: string;
	accessibility_requirements?: string;
}

const userSchema: Schema = new Schema({
	email: {
		type: String,
		required: [true, 'e-mail is required'],
		trim: true,
		minlength: 1,
		unique: [true, 'that e-mail is already taken'],
		validate: {
			validator: validator.isEmail,
			message: 'email is invalid',
		},
	},
	password: {
		type: String,
		trim: true,
		required: [true, 'password is required'],
		minlength: [7, 'password must have length of 7'],
	},
	username: {
		type: String,
		trim: true,
		required: [true, 'username is required'],
		minlength: [1, 'email cannot be empty'],
		unique: [true, 'that username is already taken'],
	},
	phone_num: {
		type: String,
		trim: true,
		required: false,
		minlength: [1, 'phone number cannot be empty'],
		validate: {
			validator: validator.isMobilePhone,
			message: 'phone number is invalid',
		},
	},
	groups: {
		type: [Schema.Types.ObjectId],
		default: [],
		required: false,
	},
	dietary_requirements: {
		trim: true,
		type: String,
		required: false,
	},
	accessibility_requirements: {
		type: String,
		trim: true,
		required: false,
	},
});

export const User: Model<IUser> = model('user', userSchema);
