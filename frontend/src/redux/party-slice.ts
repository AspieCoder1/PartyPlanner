import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Mongoose } from 'mongoose';

const apiRoute = process.env.REACT_APP_BACKEND_URL || '';

export type PartyState = {
	parties: any[];
	error: string;
	loading: boolean;
};

export interface PartyErrors {
	name?: string;
	organiser?: string;
	description?: string;
	location?: string;
	date?: string;
	time?: string;
	ageRate?: string;
}

export type Party = {
  _id: string;
  name: string;
  organiser: string;
  description: string;
  location: string;
  date: string;
  time: string;
  ageRate: boolean;
  attendeesID: string[];
  todoID: string;
  publicParty: boolean;
};

type NewPartyState = {
  _id: string;
	name: string;
	organiser: string;
	description: string;
	location: string;
	date: string;
	time: string;
	ageRate: boolean;
	publicParty: boolean;
};

export const initialState: PartyState = {
	parties: [],
	error: '',
	loading: false,
};

export const createParty = createAsyncThunk(
	'parties/createParty',
	async (newParty: NewPartyState, thunkAPI) => {
		try {
			const { data } = await axios.post(
				`${apiRoute}/api/parties/create`,
				newParty
			);
			return data;
		} catch (err) {
			const data: PartyErrors = err.response.data as PartyErrors;
			console.log(data);
			return thunkAPI.rejectWithValue(data);
		}
	}
);

export const getParties = createAsyncThunk(
	'parties/getParties',
	async (id: string, thunkAPI) => {
		try {
			const { data } = await axios.get(
				`${apiRoute}/api/parties/invited-parties/${id}`
			);
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

export const updateParty = createAsyncThunk(
	'parties/updateParty',
	async (updateParty: { _id: string; updates: Party }, thunkAPI) => {
		try {
			const { data } = await axios.patch(
				`${apiRoute}/api/parties/update/${updateParty._id}`,
				updateParty
			);
			return data;
		} catch (err) {
			const data: PartyErrors = err.response.data as PartyErrors;
			return thunkAPI.rejectWithValue(data);
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
				(state: PartyState, action: PayloadAction<any[]>) => {
					state.parties = action.payload;
					state.error = '';
				}
			)
			.addCase(
				getParties.rejected,
				(state: PartyState, action: PayloadAction<string>) => {
					state.error = action.payload;
				}
			)
			.addCase(
				updateParty.fulfilled,
				(state: PartyState, action: PayloadAction<Party>) => {
					state.parties.push(action.payload);
				}
			)
			.addCase(
				createParty.fulfilled,
				(state: PartyState, action: PayloadAction<Party>) => {
					state.parties.push(action.payload);
					state.error = '';
				}
			);
	},
});

export const { setParties } = partySlice.actions;

export default partySlice.reducer;
