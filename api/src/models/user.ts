import {Schema, Document, ObjectId, Model, model} from 'mongoose';
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

const userSchema: Schema = new Schema<any>({
    email: {
        type: String,
        required: [true, 'e-mail must be defined'],
        trim: true,
        minlength: 1,
        unique: [true, 'that e-mail is already taken'],
        validate: {
            validator: validator.isEmail,
        },
    },
    username: {
        type: String,
        required: true,
        minlength: 1,
        unique: [true, 'that username is already taken']
    },
    phone_num: {
        type: String,
        required: false,
        minlength: 1,
        validate: {
            validator: validator.isMobilePhone
        }
    },
    groups: {
        type: [Schema.Types.ObjectId],
        default: [],
        required: false,
    },
    dietary_requirements: {
        type: String,
        required: false,
    },
    accessibility_requirements: {
        type: String,
        required: false,
    }
})

export const User: Model<IUser> = model('user', userSchema)