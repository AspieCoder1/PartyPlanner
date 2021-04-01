import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const apiRoute = process.env.REACT_APP_BACKEND_URL || '';

export type PartyState = {
	parties: any[];
	error: string;
	loading: boolean;
};

export const initialState: PartyState = {
	parties: [],
	error: '',
	loading: false,
};

export const getParties = createAsyncThunk(
	'parties/getParties',
	async (id: string, thunkAPI) => {
		try {
			const { data } = await axios.get(`${apiRoute}/api/parties/invited-parties/${id}`);
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
		builder.addCase(getParties.pending, (state: PartyState) => {
			state.loading = true;
			state.error = '';
		})
			.addCase(
				getParties.fulfilled,
				(state: PartyState, action: PayloadAction<any>) => {
					state.loading = false;
					state.parties = action.payload;
					state.error = '';
				}
			)
			.addCase(
				getParties.rejected,
				(state: PartyState, action: PayloadAction<string>) => {
					state.loading = false;
					state.error = action.payload;
				}
			);
	},
});

export const { setParties } = partySlice.actions;

export default partySlice.reducer;
