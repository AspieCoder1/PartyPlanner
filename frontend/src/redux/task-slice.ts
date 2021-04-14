import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoute } from '../utils/api';

export type Task = {
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
	loading: boolean;
	tasks: Task[];
	error: string;
};

type ToggleArgs = {
	id: string;
	completed: boolean;
};

type ToggleArgsFulfilled = {
	id: string;
	toggle: boolean;
};

export const initialState = {
	loading: false,
	tasks: [],
	error: '',
};

export const toggleCompleted = createAsyncThunk(
	'tasks/toggleCompleted',
	async (toggleArgs: ToggleArgs, thunkAPI) => {
		const { id, completed } = toggleArgs;
		const toggle = !completed;
		const updates: Partial<Task> = {
			taskcompleted: toggle,
		};

		try {
			await axios.patch(`${apiRoute}/api/todos/update/${id}`, { updates });
			return { toggle, id };
		} catch (e) {
			return thunkAPI.rejectWithValue('Oops something went wrong');
		}
	}
);

export const getTasks = createAsyncThunk(
	'tasks/getTasks',
	async (id: string, thunkAPI) => {
		try {
			const { data } = await axios.get(`${apiRoute}/api/todos/my-tasks/${id}`);
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
			const { data } = await axios.post(
				`${apiRoute}/api/todos/create`,
				taskToAdd
			);
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

export const deleteTask = createAsyncThunk(
	'tasks/delete',
	async (id: string, thunkAPI) => {
		try {
			await axios.delete(`${apiRoute}/api/todos/${id}`);
			return id;
		} catch (e) {
			return thunkAPI.rejectWithValue("Couldn't delete the task");
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
			.addCase(getTasks.pending, (state: TaskState) => {
				state.error = '';
				state.loading = true;
			})
			.addCase(
				getTasks.fulfilled,
				(state: TaskState, action: PayloadAction<Task[]>) => {
					state.loading = false;
					state.tasks = action.payload;
				}
			)
			.addCase(
				getTasks.rejected,
				(state: TaskState, action: PayloadAction<string>) => {
					state.loading = false;
					state.error = action.payload;
				}
			)
			.addCase(
				addTask.fulfilled,
				(state: TaskState, action: PayloadAction<Task>) => {
					state.error = '';
					state.tasks.push(action.payload);
				}
			)
			.addCase(
				deleteTask.fulfilled,
				(state: TaskState, action: PayloadAction<string>) => {
					state.tasks = state.tasks.filter(
						(task: Task) => task.id !== action.payload
					);
					if (state.tasks.length === 0) {
						state.error = 'You have no tasks';
					}
				}
			)
			.addCase(
				toggleCompleted.fulfilled,
				(state: TaskState, action: PayloadAction<ToggleArgsFulfilled>) => {
					const { id, toggle } = action.payload;
					state.tasks.filter(
						(task: Task) => task.id === id
					)[0].taskcompleted = toggle;
				}
			),
});

export const { setErrors, setTodos } = taskSlice.actions;

export default taskSlice.reducer;
