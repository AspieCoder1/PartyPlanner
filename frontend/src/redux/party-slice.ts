import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type PartyState = {
	parties: any[];
	error: string;
};

const initialState: PartyState = {
	parties: [],
	error: '',
};

export const getParties = createAsyncThunk(
	'parties/getParties',
	async (id: string, thunkAPI) => {
		try {
			const { data } = await axios.post('api/parties/invited-parties', { id });
			console.log(data);
			return data;
		} catch (err) {
			const msg = 'Oops something went wrong';
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

const partySlice = createSlice({
	name: 'party',
	initialState,
	reducers: {
		setParties: (state, action) => {
			state.parties = action.payload;
		},
	},
	extraReducers: (builder) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		builder
			.addCase(
				getParties.fulfilled,
				(state: PartyState, action: PayloadAction<any>) => {
					state.parties = action.payload;
				}
			)
			.addCase(
				getParties.rejected,
				(state: PartyState, action: PayloadAction<string>) => {
					state.error = action.payload;
				}
			);
	},
});

export const { setParties } = partySlice.actions;

export default partySlice.reducer;
