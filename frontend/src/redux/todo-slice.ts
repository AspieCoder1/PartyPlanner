import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type TodoState = {
	todos: any[];
	error: string;
};

const initialState = {
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
		setErrors: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
	extraReducers: (builder) =>
		builder.addCase(
			getTodos.fulfilled,
			(state: TodoState, action: PayloadAction<any[]>) => {
				state.todos = action.payload;
			}
		),
});
