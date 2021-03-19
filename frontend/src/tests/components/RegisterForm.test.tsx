import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterForm } from '../../components/RegisterForm';

describe('RegisterForm component', () => {
	it('Should display error if fields are not filled in', async () => {
		const closeModel = jest.fn();
		const onSubmit = jest.fn();

		render(<RegisterForm closeModal={closeModel} onSubmit={onSubmit} />);

		fireEvent.click(screen.getByTestId('submitButton'));
		await waitFor(() => {
			expect(screen.getAllByText('Required').length).toBe(3);
		});
	});

	it('Should handle form submit correctly', async () => {
		const closeModel = jest.fn();
		const onSubmit = jest.fn();

		render(<RegisterForm closeModal={closeModel} onSubmit={onSubmit} />);

		const newUser = {
			email: 'test@test.com',
			password: '2133qrerefdwf',
			username: 'username',
		};

		userEvent.type(screen.getByPlaceholderText('e-mail'), newUser.email);
		userEvent.type(screen.getByPlaceholderText('password'), newUser.password);
		userEvent.type(screen.getByPlaceholderText('username'), newUser.username);
		fireEvent.click(screen.getByTestId('submitButton'));

		await waitFor(() => {
			expect(onSubmit).toHaveBeenCalledTimes(1);
			expect(onSubmit).toHaveBeenLastCalledWith(newUser);
		});
	});

	it('Should display error if username is too short', async () => {
		const closeModel = jest.fn();
		const onSubmit = jest.fn();

		render(<RegisterForm closeModal={closeModel} onSubmit={onSubmit} />);

		userEvent.type(screen.getByPlaceholderText('username'), 'u');
		fireEvent.click(screen.getByTestId('submitButton'));

		await waitFor(() => {
			expect(screen.getAllByText('Required').length).toBe(2);
			expect(
				screen.getByText('username must have at least 5 characters')
			).toBeTruthy();
		});
	});

	it('Should display error if username is too long', async () => {
		const closeModel = jest.fn();
		const onSubmit = jest.fn();

		render(<RegisterForm closeModal={closeModel} onSubmit={onSubmit} />);

		userEvent.type(
			screen.getByPlaceholderText('username'),
			'uasdfdghdhtyrrjyrtryjutjkutktudhujhjtyujkudiojukuiykiuydki'
		);
		fireEvent.click(screen.getByTestId('submitButton'));

		await waitFor(() => {
			expect(screen.getAllByText('Required').length).toBe(2);
			expect(
				screen.getByText('max username length is 20 characters')
			).toBeTruthy();
		});
	});

	it('Should display error if email is invalid', async () => {
		const closeModel = jest.fn();
		const onSubmit = jest.fn();

		render(<RegisterForm closeModal={closeModel} onSubmit={onSubmit} />);

		userEvent.type(screen.getByPlaceholderText('e-mail'), 'test');
		fireEvent.click(screen.getByTestId('submitButton'));

		await waitFor(() => {
			expect(screen.getAllByText('Required').length).toBe(2);
			expect(screen.getByText('Invalid email')).toBeTruthy();
		});
	});

	it('Should run close modal when close modal is clicked', () => {
		const closeModel = jest.fn();
		const onSubmit = jest.fn();

		render(<RegisterForm closeModal={closeModel} onSubmit={onSubmit} />);

		fireEvent.click(screen.getByText('\u00D7'));
		expect(closeModel).toHaveBeenCalledTimes(1);
	});

	it('Should display error if API error', async () => {
		const errors = {
			email: 'Email already exists',
			username: 'Username is taken',
		};

		const closeModel = jest.fn();
		const onSubmit = jest.fn(() => Promise.resolve({ ...errors }));

		render(<RegisterForm closeModal={closeModel} onSubmit={onSubmit} />);

		userEvent.type(screen.getByPlaceholderText('e-mail'), 'test@test.com');
		userEvent.type(screen.getByPlaceholderText('username'), 'test01');
		userEvent.type(screen.getByPlaceholderText('password'), 'test-password');
		fireEvent.click(screen.getByTestId('submitButton'));

		await waitFor(() => {
			expect(screen.getByText(errors.email)).toBeTruthy();
			expect(screen.getByText(errors.username)).toBeTruthy();
		});
	});
});
