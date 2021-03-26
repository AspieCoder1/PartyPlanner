import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type Task  = {
	id: string,
	taskname: string,
	taskdesc: string,
	taskduedate: string,
	taskduetime: string,
	taskcreator: string,
	taskcompleted: boolean,
}

export type TaskState = {
	todos: Task[];
	error: string;
};

export const initialState = {
	todos: [],
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

const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setErrors: (state: TaskState, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		setTodos: (state:TaskState, action: PayloadAction<Task[]>) => {
			state.todos = action.payload;
		},
	},
	extraReducers: (builder) =>
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		builder.addCase(
			getTasks.fulfilled,
			(state: TaskState, action: PayloadAction<Task[]>) => {
				state.todos = action.payload;
			}
		).addCase(getTasks.rejected, (state: TaskState, action: PayloadAction<string>) => {
			state.error = action.payload;
		}),
});


export const {setErrors, setTodos} = taskSlice.actions;

export default taskSlice.reducer;