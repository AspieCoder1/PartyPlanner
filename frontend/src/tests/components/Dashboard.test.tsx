import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { Dashboard } from '../../components/Dashboard';
import { UserState } from '../../redux/user-slice';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore} from '@reduxjs/toolkit';
import store from '../../redux/store';

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

		render(
			<Provider store={store}>
				<Dashboard
					getTasks={getTodos}
					getParties={getParties}
					user={user}
					parties={parties}
					addTask={jest.fn()}
				/>
			</Provider>,
			{ wrapper: MemoryRouter }
		);

		expect(screen.getByText('Hello, TestUsername')).toBeTruthy();
	});
});
