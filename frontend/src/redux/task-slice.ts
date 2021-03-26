import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type Task = {
	id: string;
	taskname: string;
	taskdesc: string;
	taskduedate: string;
	taskduetime: string;
	taskcreator: string;
	taskcompleted: boolean;
};

type TaskToAdd = {
	taskname: string;
	taskdesc: string;
	taskdue: string;
};

export type TaskState = {
	tasks: Task[];
	error: string;
};

export const initialState = {
	tasks: [],
	error: '',
};

export const getTasks = createAsyncThunk(
	'tasks/getTasks',
	async (id: string, thunkAPI) => {
		try {
			const { data } = await axios.get(`api/todos/my-tasks/${id}`);
			return data;
		} catch (err) {
			let msg = 'Oops something went wrong';
			if (typeof err.response.data !== 'undefined') {
				msg = err.response.data;
			}
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

export const addTask = createAsyncThunk(
	'tasks/createTask',
	async (taskToAdd: TaskToAdd, thunkAPI) => {
		try {
			const { data } = await axios.post('api/todos/create', taskToAdd);
			return data;
		} catch (err) {
			let msg = 'Oops something went wrong';
			const { response } = err;
			if (response.status !== 404) {
				msg = response.data ? response.data : 'Oops something went wrong';
			}
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setErrors: (state: TaskState, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		setTodos: (state: TaskState, action: PayloadAction<Task[]>) => {
			state.tasks = action.payload;
		},
	},
	extraReducers: (builder) =>
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		builder
			.addCase(
				addTask.fulfilled,
				(state: TaskState, action: PayloadAction<Task[]>) => {
					state.tasks = action.payload;
				}
			)
			.addCase(
				addTask.rejected,
				(state: TaskState, action: PayloadAction<string>) => {
					state.error = action.payload;
				}
			)
			.addCase(
				getTasks.fulfilled,
				(state: TaskState, action: PayloadAction<Task>) => {
					state.tasks.push(action.payload);
				}
			),
});

export const { setErrors, setTodos } = taskSlice.actions;

export default taskSlice.reducer;
