import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import partyReducer from './party-slice';

const store = configureStore({
	reducer: {
		user: userReducer,
		parties: partyReducer,
	},
});

export default store;

export type Store = ReturnType<typeof store.getState>;
