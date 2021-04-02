import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const apiRoute = process.env.REACT_APP_BACKEND_URL || '';

export interface UserErrors {
	email?: string;
	password?: string;
	username?: string;
}

export interface UserState {
	id: string;
	token: string;
	userName: string;
	errors: UserErrors;
	status: string;
}

export const initialState: UserState = {
	status: '',
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

type LoginUser = {
	email: string;
	password: string;
};

export const registerUser = createAsyncThunk(
	'users/registerUser',
	async (newUser: RegisterUser, thunkAPI) => {
		try {
			const { data } = await axios.post(
				`${apiRoute}/api/users/register`,
				newUser
			);
			return data;
		} catch (err) {
			const data: UserErrors = err.response.data as UserErrors;
			return thunkAPI.rejectWithValue(data);
		}
	}
);

export const loginUser = createAsyncThunk(
	'users/loginUser',
	async (newUser: LoginUser, thunkAPI) => {
		try {
			const { data } = await axios.post(`${apiRoute}/api/users/login`, newUser);
			return data;
		} catch (err) {
			const data: UserErrors = err.response.data as UserErrors;
			return thunkAPI.rejectWithValue(data);
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
		logOut: (state: UserState) => {
			state.errors = {};
			state.userName = '';
			state.token = '';
			state.id = '';
		},
	},
	extraReducers: (builder) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		builder
			.addCase(registerUser.pending, (state: UserState) => {
				state.status = 'pending';
			})
			.addCase(
				registerUser.fulfilled,
				(
					state: UserState,
					action: PayloadAction<{ id: string; userName: string; token: string }>
				) => {
					state.status = 'success';
					state.id = action.payload.id;
					state.userName = action.payload.userName;
					state.token = action.payload.token;
					state.errors = {};
					localStorage.setItem('token', action.payload.token);
				}
			)
			.addCase(
				registerUser.rejected,
				(state: UserState, action: PayloadAction<UserErrors>) => {
					state.status = 'failed';
					state.errors = action.payload;
				}
			)
			.addCase(loginUser.pending, (state: UserState) => {
				state.status = 'pending';
			})
			.addCase(
				loginUser.fulfilled,
				(
					state: UserState,
					action: PayloadAction<{
						success: boolean;
						token: string;
						id: string;
						userName: string;
					}>
				) => {
					state.status = 'success';
					state.token = action.payload.token;
					state.id = action.payload.id;
					state.errors = {};
					state.userName = action.payload.userName;
					localStorage.setItem('token', action.payload.token);
				}
			)
			.addCase(
				loginUser.rejected,
				(state: UserState, action: PayloadAction<UserErrors>) => {
					state.status = 'failed';
					state.errors = action.payload;
				}
			);
	},
});

export const { setId, setToken, setUsername, setErrors } = userSlice.actions;
export default userSlice.reducer;
