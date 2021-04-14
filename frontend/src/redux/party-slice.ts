import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiRoute } from '../utils/api';

export type PartyState = {
	parties: Party[];
	party: Party | undefined;
	fetchingParty: boolean;
	error: string;
	loading: boolean;
	fetchingPublicParties: boolean;
	publicPartyError: string;
	publicParties: Party[];
	filtered: Party[];
	filter: string;
	inviteError: string;
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

export type PartyUpdates = {
	name: string;
	description: string;
	location: string;
	date: string;
	time: string;
	ageRate: boolean;
	publicParty: boolean;
};

type NewPartyState = {
	name: string;
	organiser: string;
	description: string;
	location: string;
	date: string;
	time: string;
	ageRate: boolean;
	attendeesID: string[];
	publicParty: boolean;
};

export type InviteObject = {
	id: string;
	userID: string;
};

export const initialState: PartyState = {
	parties: [],
	party: undefined,
	error: '',
	fetchingParty: true,
	loading: false,
	fetchingPublicParties: false,
	publicPartyError: '',
	publicParties: [],
	filtered: [],
	filter: '',
	inviteError: '',
};

export const createParty = createAsyncThunk('parties/createParty', async (newParty: NewPartyState, thunkAPI) => {
	try {
		const { data } = await axios.post(`${apiRoute}/api/parties/create`, newParty);
		return data;
	} catch (err) {
		const data: PartyErrors = err.response.data as PartyErrors;
		return thunkAPI.rejectWithValue(data);
	}
});

export const getParty = createAsyncThunk('parties/getParty', async (id: string, thunkAPI) => {
	try {
		const { data } = await axios.get(`${apiRoute}/api/parties/party/${id}`);
		return data;
	} catch (err) {
		let msg = 'Oops something went wrong';
		if (typeof err.response.data !== 'undefined') {
			msg = err.response.data;
		}
		return thunkAPI.rejectWithValue(msg);
	}
});

export const getParties = createAsyncThunk('parties/getParties', async (id: string, thunkAPI) => {
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
});

export const publicParties = createAsyncThunk('parties/publicParties', async (random: string, thunkAPI) => {
	try {
		const { data } = await axios.get(`${apiRoute}/api/parties/public-parties/`);
		return data;
	} catch (err) {
		let msg = 'Oops something went wrong';
		if (typeof err.response.data !== 'undefined') {
			msg = err.response.data;
		}
		return thunkAPI.rejectWithValue(msg);
	}
});

export const updateParty = createAsyncThunk(
	'parties/updateParty',
	async (updateParty: { _id: string; updates: PartyUpdates }, thunkAPI) => {
		try {
			const { data } = await axios.patch(`${apiRoute}/api/parties/update/${updateParty._id}`, updateParty);
			return data;
		} catch (err) {
			const data: PartyErrors = err.response.data as PartyErrors;
			return thunkAPI.rejectWithValue(data);
		}
	}
);

export const joinParty = createAsyncThunk(
	'party/joinParty',
	async (partyObj: { partyId: string; userId: string }, thunkAPI) => {
		const { partyId, userId } = partyObj;
		try {
			await axios.post(`${apiRoute}/api/parties/join/${partyId}`, {
				attenderID: userId,
			});
			return { partyId, userId };
		} catch (e) {
			return thunkAPI.rejectWithValue('Unable to join the party');
		}
	}
);

export const invite = createAsyncThunk('party/invite', async (inviteObject: InviteObject, thunkAPI) => {
	const { id, userID } = inviteObject;
	try {
		await axios.post(`${apiRoute}/api/parties/invite/${id}`, { userID });
	} catch (e) {
		return thunkAPI.rejectWithValue(e.response.data);
	}
});

const partySlice = createSlice({
	name: 'party',
	initialState,
	reducers: {
		filterParties: (state: PartyState, action: PayloadAction<string>) => {
			const { payload } = action;
			const filter = state.publicParties;
			state.filtered = filter.filter(({ name }: Party) => name.toLowerCase().includes(payload));
		},
		setParties: (state: PartyState, action: PayloadAction<Party[]>) => {
			state.parties = action.payload;
		},
		setParty: (state: PartyState, action: PayloadAction<Party | undefined>) => {
			state.party = action.payload;
		},
	},
	extraReducers: (builder) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		builder
			.addCase(getParties.pending, (state: PartyState) => {
				state.loading = true;
			})
			.addCase(getParties.fulfilled, (state: PartyState, action: PayloadAction<Party[]>) => {
				state.parties = action.payload;
				state.error = '';
				state.loading = false;
			})
			.addCase(getParties.rejected, (state: PartyState, action: PayloadAction<string>) => {
				state.error = action.payload;
				state.loading = false;
			})
			.addCase(updateParty.fulfilled, (state: PartyState, action: PayloadAction<Party>) => {
				state.parties.push(action.payload);
			})
			.addCase(createParty.fulfilled, (state: PartyState, action: PayloadAction<Party>) => {
				state.parties.push(action.payload);
				state.error = '';
				state.party = action.payload;
			})
			.addCase(getParty.pending, (state: PartyState) => {
				state.fetchingParty = true;
			})
			.addCase(getParty.fulfilled, (state: PartyState, action: PayloadAction<Party>) => {
				state.fetchingParty = false;
				state.party = action.payload;
			})
			.addCase(getParty.rejected, (state: PartyState, action: PayloadAction<string>) => {
				state.fetchingParty = false;
				state.error = action.payload;
			})
			.addCase(publicParties.fulfilled, (state: PartyState, action: PayloadAction<Party[]>) => {
				state.fetchingPublicParties = false;
				state.publicParties = action.payload;
				state.filtered = action.payload;
			})
			.addCase(publicParties.pending, (state: PartyState) => {
				state.fetchingPublicParties = true;
			})
			.addCase(publicParties.rejected, (state: PartyState, action: PayloadAction<string>) => {
				state.fetchingPublicParties = false;
				state.publicPartyError = action.payload;
			})
			.addCase(joinParty.fulfilled, (state: PartyState, action: PayloadAction<{ partyId: string; userId: string }>) => {
				const { partyId, userId } = action.payload;
				const joinedParty: Party = state.publicParties.find(({ _id }: Party) => _id === partyId)!;

				if (joinedParty) {
					state.parties.push(joinedParty);
					state.filtered.find(({ _id }: Party) => _id === partyId)?.attendeesID.push(userId);
				}
			})
			.addCase(invite.pending, (state: PartyState) => {
				state.inviteError = '';
			})
			.addCase(invite.fulfilled, (state: PartyState) => {
				state.inviteError = '';
			})
			.addCase(invite.rejected, (state: PartyState, action: PayloadAction<string>) => {
				state.inviteError = action.payload;
			});
	},
});

export const { setParties, setParty, filterParties } = partySlice.actions;

export default partySlice.reducer;
