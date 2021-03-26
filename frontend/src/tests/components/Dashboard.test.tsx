import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { Dashboard } from '../../components/Dashboard';
import { UserState } from '../../redux/user-slice';
import { MemoryRouter } from 'react-router-dom';

describe('Test dashboard component', () => {
	it('should render username correctly', () => {
		const getParties = jest.fn();
		const getTodos = jest.fn();
		const user: UserState = {
			userName: 'TestUsername',
			token: '',
			id: '',
			errors: {},
		};
		const parties = {
			parties: [],
			error: '',
		};
		const todos = {
			todos: [],
			error: '',
		};

		render(<Dashboard todos={todos} getTodos={getTodos} getParties={getParties} user={user} parties={parties} />, {wrapper: MemoryRouter});
		expect(screen.getByText('Hello, TestUsername')).toBeTruthy();
	});
});
