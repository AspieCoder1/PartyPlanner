import reducer, { setUsername, setId, setToken } from '../../redux/user-slice';

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
});
