import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import user from '../../../api/src/routes/user';

interface UserErrors {
	email?: string;
	password?: string;
	username?: string;
}

interface UserState {
	id: string;
	token: string;
	userName: string;
	errors: UserErrors;
}

const initialState: UserState = {
	id: '',
	token: '',
	userName: '',
	errors: {},
};

type RegisterUser = {
	username: string;
	email: string;
	password: string;
};

export const registerUser = createAsyncThunk(
	'users/registerUser',
	async (newUser: RegisterUser) => {
		try {
			const { data } = await axios.post('/api/users/register', newUser);
			return data;
		} catch (err) {
			const { data } = err;
			return data;
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setId: (state: UserState, action: PayloadAction<string>) => {
			state.id = action.payload;
		},
		setToken: (state: UserState, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		setUsername: (state: UserState, action: PayloadAction<string>) => {
			state.userName = action.payload;
		},
		setErrors: (state: UserState, action: PayloadAction<UserErrors>) => {
			state.errors = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			registerUser.fulfilled,
			(state: UserState, action: PayloadAction<{ id: string; userName: string }>) => {
				state.id = action.payload.id;
				state.userName = action.payload.userName;
			}
		);
	},
});

export const { setId, setToken, setUsername, setErrors } = userSlice.actions;
export default userSlice.reducer;
