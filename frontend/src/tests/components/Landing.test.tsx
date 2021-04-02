import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Landing from '../../components/Landing';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

describe('Landing page component', () => {
	it('Should render component correctly', () => {
		render(
			<Provider store={store}>
				<Landing />
			</Provider>,
			{ wrapper: MemoryRouter }
		);

		expect(screen.getByText('Take the stress out of party planning')).toBeTruthy();
		expect(screen.getByText('Login')).toBeTruthy();
		expect(screen.getByText('Register')).toBeTruthy();
	});
});
