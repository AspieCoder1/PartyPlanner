import { Schema, Document, ObjectId, Model, model } from 'mongoose';


export interface ITask extends Document {
	taskname: string;
	taskdesc: string;
	taskdue: string;
	taskcreator: ObjectId;
	taskcompleted: boolean;
}

const TaskSchema: Schema = new Schema({
	taskname: {
		type: String,
		required: [true, 'Task name is required'],
		trim: true,
		minlength: 1,
	},
	taskdesc: {
		type: String,
		trim: true,
		required: [true, 'Task Description is required'],
		minlength: [1],
	},
	taskdue: {
		type: String,
		trim: true,
	},
	taskcreator: {
		type: Schema.Types.ObjectId,
		trim: true,
	},
	taskcompleted: {
		type: Boolean,
		default: false,
	},
});

export const User: Model<ITask> = model('task', TaskSchema);
