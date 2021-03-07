import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterForm } from '../../components/RegisterForm';

describe('RegisterForm component', () => {
	it('Should display error if fields are not filled in', async () => {
		const closeModel = jest.fn();
		render(<RegisterForm closeModal={closeModel} />);

		fireEvent.click(screen.getByTestId('submitButton'));
		await waitFor(() => {
			expect(screen.getAllByText('Required').length).toBe(3);
		});
	});

	it('Should display no errors if all fields are filled in and are valid', async () => {
		const closeModel = jest.fn();
		const { container } = render(<RegisterForm closeModal={closeModel} />);

		userEvent.type(screen.getByPlaceholderText('e-mail'), 'test@test.com');
		userEvent.type(screen.getByPlaceholderText('password'), '2133qrerefdwf');
		userEvent.type(screen.getByPlaceholderText('username'), 'username');
		fireEvent.click(screen.getByTestId('submitButton'));

		await waitFor(() => {
			expect(container.querySelector('#emailError')).toBeNull();
			expect(container.querySelector('#passwordError')).toBeNull();
			expect(container.querySelector('#usernameError')).toBeNull();
		});
	});

	it('Should display error if username is too short', async () => {
		const closeModel = jest.fn();
		render(<RegisterForm closeModal={closeModel} />);

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
		render(<RegisterForm closeModal={closeModel} />);

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
		render(<RegisterForm closeModal={closeModel} />);

		userEvent.type(screen.getByPlaceholderText('e-mail'), 'test');
		fireEvent.click(screen.getByTestId('submitButton'));

		await waitFor(() => {
			expect(screen.getAllByText('Required').length).toBe(2);
			expect(screen.getByText('Invalid email')).toBeTruthy();
		});
	});

	it('Should run close modal when close modal is clicked', () => {
		const closeModel = jest.fn();
		render(<RegisterForm closeModal={closeModel} />);

		fireEvent.click(screen.getByText('\u00D7'));
		expect(closeModel).toHaveBeenCalledTimes(1);
	});
});
