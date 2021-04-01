import { render, screen } from '@testing-library/react';
import * as React from 'react';
import Dashboard from '../../components/Dashboard';
import { setUsername } from '../../redux/user-slice';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';

describe('Test dashboard component', () => {
	it('should render username correctly', () => {
		render(
			<Provider store={store}>
				<Dashboard />
			</Provider>,
			{ wrapper: MemoryRouter }
		);

		store.dispatch(setUsername('TestUsername'));
		expect(screen.getByText('Hello, TestUsername')).toBeTruthy();
	});
});
