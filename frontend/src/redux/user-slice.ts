import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

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
	async (newUser: RegisterUser, thunkAPI) => {
		try {
			const { data } = await axios.post('/api/users/register', newUser);
			return data;
		} catch (err) {
			const data: UserErrors = err.data as UserErrors;
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
	},
	extraReducers: (builder) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		builder
			.addCase(
				registerUser.fulfilled,
				(
					state: UserState,
					action: PayloadAction<{ id: string; userName: string }>
				) => {
					state.id = action.payload.id;
					state.userName = action.payload.userName;
				}
			)
			.addCase(
				registerUser.rejected,
				(state: UserState, action: PayloadAction<UserErrors>) => {
					state.errors = action.payload;
				}
			);
	},
});

export const { setId, setToken, setUsername, setErrors } = userSlice.actions;
export default userSlice.reducer;
