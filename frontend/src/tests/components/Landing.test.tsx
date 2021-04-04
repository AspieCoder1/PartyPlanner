import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Landing from '../../components/Landing';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

describe('<Landing/>', () => {
	it('Should render component correctly', () => {
		render(
			<Provider store={store}>
				<Landing />
			</Provider>,
			{ wrapper: MemoryRouter }
		);

		expect(
			screen.getByText('Take the stress out of party planning')
		).toBeTruthy();
		expect(screen.getByText('Login')).toBeTruthy();
		expect(screen.getByText('Register')).toBeTruthy();
	});

	it('Should render login form correctly', () => {
		render(
			<Provider store={store}>
				<Landing />
			</Provider>,
			{ wrapper: MemoryRouter }
		);

		screen.getByText('Login').click();
		expect(screen.getByPlaceholderText('e-mail')).toBeTruthy();
		expect(screen.getByPlaceholderText('password')).toBeTruthy();
		expect(screen.getAllByText('Log In').length).toBe(2);
	});

	it('Should render modal when register button in header clicked', () => {
		render(
			<Provider store={store}>
				<Landing />
			</Provider>,
			{ wrapper: MemoryRouter }
		);

		screen.getByText('Register').click();

		expect(screen.getByPlaceholderText('e-mail')).toBeTruthy();
		expect(screen.getByPlaceholderText('password')).toBeTruthy();
		expect(screen.getByPlaceholderText('username')).toBeTruthy();
		expect(screen.getAllByText('Register').length).toBe(3);
	});

	it('Should render modal when get PartyPlanner pressed', () => {
		render(
			<Provider store={store}>
				<Landing />
			</Provider>,
			{ wrapper: MemoryRouter }
		);

		screen.getByText('Get PartyPlanner').click();

		expect(screen.getByPlaceholderText('e-mail')).toBeTruthy();
		expect(screen.getByPlaceholderText('password')).toBeTruthy();
		expect(screen.getByPlaceholderText('username')).toBeTruthy();
		expect(screen.getAllByText('Register').length).toBe(3);
	});
});
