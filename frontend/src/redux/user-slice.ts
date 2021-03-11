import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import user from "../../../api/src/routes/user";

interface UserState {
	id: string;
	token: string;
	userName: string;
}

const initialState: UserState = {
	id: '',
	token: '',
	userName: '',
};


type RegisterUser = {
	username: string;
	email: string;
	password: string;
}

export const registerUser = createAsyncThunk(
	'users/registerUser',
	async (newUser: RegisterUser) => {
		const { data } = await axios.post('/api/users/register', newUser);
		return data;
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
	},
	extraReducers: (builder) => {
		builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<{ id: string; userName: string;}>) => {
			state.id = action.payload.id;
			state.userName = action.payload.userName;
		});
	},
});

export const { setId, setToken, setUsername } = userSlice.actions;
export default userSlice.reducer;

