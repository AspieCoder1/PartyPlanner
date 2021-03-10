import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
});

export const { setId, setToken, setUsername } = userSlice.actions;
export default userSlice.reducer;
