import reducer, { deleteTask, getTasks, initialState, setErrors, setTodos, TaskState } from '../../redux/task-slice';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('todo slice', () => {
	it('should set correct default state', () => {
		const state: TaskState = reducer(undefined, { type: '' });
		expect(state).toEqual(initialState);
	});

	it('should correctly set error', () => {
		const data = 'error goes here';
		const state: TaskState = reducer(undefined, setErrors(data));
		expect(state.error).toBe(data);
	});

	it('should correctly set todos', () => {
		const data = [
			{
				id: 'test',
				taskname: 'Task 1',
				taskdesc: 'Task 1',
				taskduedate: 'Task 1',
				taskduetime: 'Task 1',
				taskcreator: 'Task 1',
				taskcompleted: true,
			},
		];
		const state: TaskState = reducer(undefined, setTodos(data));
		expect(state.tasks).toBe(data);
	});

	it('should handle set state if it can get parties', async () => {
		const data = [
			{
				id: 'test',
				taskname: 'Task 1',
				taskdesc: 'Task 1',
				taskduedate: 'Task 1',
				taskduetime: 'Task 1',
				taskcreator: 'Task 1',
				taskcompleted: true,
			},
		];
		mockAxios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data,
			})
		);

		const store = configureStore({ reducer: reducer });
		await store.dispatch(getTasks('test'));
		const state: TaskState = store.getState();
		expect(state.tasks).toEqual(data);
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
		await store.dispatch(getTasks('test'));
		const state: TaskState = store.getState();
		expect(state.error).toBe('Todos not found');
	});

	it('should correctly delete a task', async () => {
		mockAxios.delete.mockImplementationOnce(() => Promise.resolve());

		const data = [
			{
				id: 'test',
				taskname: 'Task 1',
				taskdesc: 'Task 1',
				taskduedate: 'Task 1',
				taskduetime: 'Task 1',
				taskcreator: 'Task 1',
				taskcompleted: true,
			},
			{
				id: 'test1',
				taskname: 'Task 1',
				taskdesc: 'Task 1',
				taskduedate: 'Task 1',
				taskduetime: 'Task 1',
				taskcreator: 'Task 1',
				taskcompleted: true,
			},
		];

		const expectedData = [
			{
				id: 'test',
				taskname: 'Task 1',
				taskdesc: 'Task 1',
				taskduedate: 'Task 1',
				taskduetime: 'Task 1',
				taskcreator: 'Task 1',
				taskcompleted: true,
			},
		];

		const store = configureStore({ reducer: reducer });
		await store.dispatch(setTodos(data));
		await store.dispatch(deleteTask('test1'));
		expect(store.getState().tasks).toEqual(expectedData);
	});
});
