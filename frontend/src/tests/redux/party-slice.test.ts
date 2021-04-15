import axios from 'axios';
import reducer, { setParties, getParties, initialState } from '../../redux/party-slice';
import { configureStore } from '@reduxjs/toolkit';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Testing party slice', () => {
	it('should have correct initial state', () => {
		const state = reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('should correctly set parties', () => {
		const partyArr = [{ name: 'test' }];
		const state = reducer(undefined, setParties(partyArr));
		expect(state.parties).toEqual(partyArr);
	});

	it('should handle set state if it can get parties', async () => {
		const data = [{ name: 'hello world', organiser: 'me' }];
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data,
			})
		);

		const store = configureStore({ reducer: reducer });
		await store.dispatch(getParties('test'));
		const state = store.getState();
		expect(state.parties).toEqual(data);
	});

	it('should handle error if message provided', async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.reject({
				response: {
					data: 'Parties not found',
				},
			})
		);

		const store = configureStore({ reducer: reducer });
		await store.dispatch(getParties('test'));
		const state = store.getState();
		expect(state.error).toBe('Parties not found');
	});
});
