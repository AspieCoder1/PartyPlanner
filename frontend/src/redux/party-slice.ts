import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export type PartyState = {
	parties: any[];
	error: string;
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
}

type NewPartyState = {
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
}

const initialState: PartyState = {
	parties: [],
	error: '',
};

export const createParty = createAsyncThunk(
  'parties/createParty',
  async (newParty: NewPartyState, thunkAPI) => {
    try {
      const { data } = await axios.post('api/parties/create', newParty);
      return data;
    } catch (err) {
      const data: PartyErrors = err.response.data as PartyErrors;
			return thunkAPI.rejectWithValue(data);
    }
  }
);

export const getParties = createAsyncThunk(
	'parties/getParties',
	async (id: string, thunkAPI) => {
		try {
			const { data } = await axios.get(`api/parties/invited-parties/${id}`);
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
        createParty.fulfilled,
        (state: PartyState, action: PayloadAction<Party>) => {
          state.parties.push(action.payload);
        }
      );
	},
});

export const { setParties } = partySlice.actions;

export default partySlice.reducer;
