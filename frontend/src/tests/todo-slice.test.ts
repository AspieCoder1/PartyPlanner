import reducer, {
	getTodos,
	initialState,
	setErrors,
	setTodos
} from "../redux/todo-slice";
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('todo slice', () => {
	it('should set correct default state', () => {
		const state = reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('should correctly set error', () => {
		const data = 'error goes here';
		const state = reducer(undefined, setErrors(data));
		expect(state.error).toBe(data);
	});

	it('should correctly set todos', () => {
		const data = [{ id: 'test1' }, { id: 'test2' }, { id: 'test3' }];
		const state = reducer(undefined, setTodos(data));
		expect(state.todos).toBe(data);
	});

	it('should handle set state if it can get parties', async () => {
		const data = [{ name: 'hello world', organiser: 'me' }];
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data,
			})
		);

		const store = configureStore({ reducer: reducer });
		await store.dispatch(getTodos('test'));
		const state = store.getState();
		expect(state.todos).toEqual(data);
	});

	it('should handle error if message provided', async () => {
		mockAxios.get.mockImplementationOnce(() =>
			Promise.reject({
				response: {
					data: 'Todos not found',
				},
			})
		);

		const store = configureStore({ reducer: reducer });
		await store.dispatch(getTodos('test'));
		const state = store.getState();
		expect(state.error).toBe('Todos not found');
	});
});
