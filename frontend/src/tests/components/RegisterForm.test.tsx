import * as React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterForm } from '../../components/landing/RegisterForm';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import axios from 'axios';
import { setErrors } from '../../redux/user-slice';

jest.mock('axios');

describe('<RegisterForm/>', () => {
	const renderForm = (closeModal: jest.Mock) =>
		render(
			<Provider store={store}>
				<RegisterForm closeModal={closeModal} />
			</Provider>
		);

	it('Should display error if fields are not filled in', async () => {
		const closeModal = jest.fn();
		renderForm(closeModal);

		act(() => {
			fireEvent.click(screen.getByTestId('submitButton'));
		});

		await waitFor(() => {
			expect(screen.getAllByText('Required').length).toBe(3);
		});
	});

	it('Should display error if username is too short', async () => {
		const closeModal = jest.fn();
		renderForm(closeModal);

		userEvent.type(screen.getByPlaceholderText('username'), 'u');
		act(() => {
			fireEvent.click(screen.getByTestId('submitButton'));
		});

		await waitFor(() => {
			expect(screen.getAllByText('Required').length).toBe(2);
			expect(screen.getByText('username must have at least 5 characters')).toBeTruthy();
		});
	});

	it('Should display error if username is too long', async () => {
		const closeModal = jest.fn();
		renderForm(closeModal);

		userEvent.type(
			screen.getByPlaceholderText('username'),
			'uasdfdghdhtyrrjyrtryjutjkutktudhujhjtyujkudiojukuiykiuydki'
		);

		act(() => {
			fireEvent.click(screen.getByTestId('submitButton'));
		});

		await waitFor(() => {
			expect(screen.getAllByText('Required').length).toBe(2);
			expect(screen.getByText('max username length is 20 characters')).toBeTruthy();
		});
	});

	it('Should display error if email is invalid', async () => {
		const closeModal = jest.fn();
		renderForm(closeModal);

		userEvent.type(screen.getByPlaceholderText('e-mail'), 'test');

		act(() => {
			fireEvent.click(screen.getByTestId('submitButton'));
		});

		await waitFor(() => {
			expect(screen.getAllByText('Required').length).toBe(2);
			expect(screen.getByText('Invalid email')).toBeTruthy();
		});
	});

	it('Should run close modal when close modal is clicked', () => {
		const closeModal = jest.fn();
		renderForm(closeModal);

		fireEvent.click(screen.getByText('\u00D7'));
		expect(closeModal).toHaveBeenCalledTimes(1);
	});

	it('Should display error if API error', async () => {
		const errors = {
			email: 'Email already exists',
			username: 'Username is taken',
		};

		const closeModal = jest.fn();
		renderForm(closeModal);

		act(() => {
			store.dispatch(setErrors(errors));
		});

		expect(screen.getByText(errors.email)).toBeTruthy();
		expect(screen.getByText(errors.username)).toBeTruthy();
	});
});
