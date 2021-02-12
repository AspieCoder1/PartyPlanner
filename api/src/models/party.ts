import { Schema, Document, ObjectId, Model, model } from 'mongoose';
import validator from 'validator';

export interface IParty extends Document {
  organiser: string;
  description: string;
  location: string;
  date: string;
  ageRate: string;
  attendeesID?: string[];
  todoID?: string;
}

const userSchema: Schema = new Schema<any>({
  organiser: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: [true, 'A location is required']
  },
  date: {
    type: Date,
    required: [true, 'A Date is required'],
    validate: {
        validator: validator.isDate,
        message: 'Invalid Date',
    }
  },
  ageRate: {
    type: Boolean,
    required: [true, 'An age rating is required']
  },
  attendeesIDs: {
    type: [Schema.Types.ObjectId],
    required: false,
    ref: 'User',
    default: [],
  },
  todoID: {
    type: String,
    required: false,
    ref: 'Todo'
  }
});

export const Party: Model<IParty> = model('party', userSchema);