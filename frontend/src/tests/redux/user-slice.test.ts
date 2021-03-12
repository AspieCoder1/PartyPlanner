import reducer, {
	setUsername,
	setId,
	setToken,
	registerUser,
} from '../../redux/user-slice';
import axios from 'axios';
import {configureStore} from '@reduxjs/toolkit';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Test user slice', () => {
	it('should have correct initial state', () => {
		const state = reducer(undefined, { type: '' });

		expect(state).toEqual({
			id: '',
			token: '',
			userName: '',
		});
	});

	it('should set id correctly', () => {
		const state = reducer(undefined, setId('test'));
		expect(state.id).toBe('test');
	});

	it('should set username correctly', () => {
		const state = reducer(undefined, setUsername('test'));
		expect(state.userName).toBe('test');
	});

	it('should set token correctly', () => {
		const state = reducer(undefined, setToken('test'));
		expect(state.token).toBe('test');
	});

	it('should handle set state correctly if registered user correctly', async () => {
		mockAxios.post.mockImplementationOnce(() => {
			return Promise.resolve({
				data: {
					userName: 'test',
					id: '123456',
				},
			});
		});

		const newUser = {
			email: 'test@example.com',
			username: 'test',
			password: '123456dfdFD',
		};

		const store = configureStore({reducer: reducer});
		await store.dispatch(registerUser(newUser));
		const state = store.getState();
		expect(state.userName).toBe('test');
		expect(state.id).toBe('123456');
	});
});
