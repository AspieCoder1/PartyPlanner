import { Schema, Document, Model, model } from 'mongoose';

export interface ITask extends Document {
	taskname: string;
	taskdesc: string;
	taskduedate: string;
	taskduetime: string;
	taskcreator: string;
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
	taskduedate: {
		type: String,
		trim: true,
	},
	taskduetime: {
		type: String,
		trim: true,
	},
	taskcreator: {
		type: String,
		trim: true,
	},
	taskcompleted: {
		type: Boolean,
		default: false,
	},
});

export const Task: Model<ITask> = model('task', TaskSchema);
