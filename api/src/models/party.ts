import { Schema, Document, ObjectId, Model, model } from 'mongoose';
import validator from 'validator';

export interface IParty extends Document {
  organiser: string;
  description: string;
  location: string;
  date: string;
  ageRate: boolean;
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
    trim: true,
    minlength: [7,'Description length needs to be atleast 7'],
    required:[true,'A description is required']
  },
  location: {
    type: String,
    trim: true,
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
  attendeesID: {
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
