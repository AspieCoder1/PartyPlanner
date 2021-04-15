import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../../components/landing/LoginForm';
import { Provider } from 'react-redux';
import { setErrors } from '../../redux/user-slice';

import store from '../../redux/store';

describe('<LoginForm/>', () => {
	const renderForm = (closeModal: jest.Mock) =>
		render(
			<Provider store={store}>
				<LoginForm closeModal={closeModal} />
			</Provider>
		);

	it('Should display error if email and password not provided', async () => {
		const closeModal = jest.fn();

		renderForm(closeModal);

		fireEvent.click(screen.getByTestId('submitButton'));

		await waitFor(() => {
			expect(screen.getAllByText('Required').length).toBe(2);
		});
	});

	it('Should display error if email is invalid', async () => {
		const closeModal = jest.fn();

		renderForm(closeModal);

		userEvent.type(screen.getByPlaceholderText('e-mail'), 'test');
		fireEvent.click(screen.getByTestId('submitButton'));

		await waitFor(() => {
			expect(screen.getAllByText('Required').length).toBe(1);
			expect(screen.getByText('Invalid email')).toBeTruthy();
		});
	});

	it('Should run close modal when close modal is clicked', () => {
		const closeModal = jest.fn();

		renderForm(closeModal);

		fireEvent.click(screen.getByText('\u00D7'));
		expect(closeModal).toHaveBeenCalledTimes(1);
	});

	it('should handle API error', () => {
		const errors = {
			email: 'User not found',
			password: 'Password is incorrect',
		};

		const closeModal = jest.fn();

		render(
			<Provider store={store}>
				<LoginForm closeModal={closeModal} />
			</Provider>
		);

		store.dispatch(setErrors(errors));
		expect(screen.getByText(errors.email)).toBeTruthy();
		expect(screen.getByText(errors.password)).toBeTruthy();
	});
});
