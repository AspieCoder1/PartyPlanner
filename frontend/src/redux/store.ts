import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user-slice';
import partyReducer from './party-slice';
import todoReducer from './todo-slice';

const store = configureStore({
	reducer: {
		user: userReducer,
		parties: partyReducer,
		todos: todoReducer,
	},
});

export default store;

export type Store = ReturnType<typeof store.getState>;
