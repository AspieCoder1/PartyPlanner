import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type TodoState = {
	todos: any[];
	error: string;
};

export const initialState = {
	todos: [],
	error: '',
};

export const getTodos = createAsyncThunk(
	'todo/getTodos',
	async (id: string, thunkAPI) => {
		try {
			const { data } = await axios.get(`api/todos/my-todos/${id}`);
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

const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		setErrors: (state: TodoState, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
		setTodos: (state:TodoState, action: PayloadAction<any[]>) => {
			state.todos = action.payload;
		},
	},
	extraReducers: (builder) =>
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		builder.addCase(
			getTodos.fulfilled,
			(state: TodoState, action: PayloadAction<any[]>) => {
				state.todos = action.payload;
			}
		).addCase(getTodos.rejected, (state: TodoState, action: PayloadAction<string>) => {
			state.error = action.payload;
		}),
});


export const {setErrors, setTodos} = todoSlice.actions;

export default todoSlice.reducer;