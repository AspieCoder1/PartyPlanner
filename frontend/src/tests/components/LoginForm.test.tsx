import * as React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../../components/LoginForm';

describe('LoginForm component', () => {
	it('Should display error if email and password not provided', async () => {
		const closeModel = jest.fn();
		const onSubmit = jest.fn();

		render(<LoginForm closeModal={closeModel} onSubmit={onSubmit} />);

		fireEvent.click(screen.getByTestId('submitButton'));

		await waitFor(() => {
			expect(screen.getAllByText('Required').length).toBe(2);
		});
	});

	it('Should display error if email is invalid', async () => {
		const closeModel = jest.fn();
		const onSubmit = jest.fn();

		render(<LoginForm closeModal={closeModel} onSubmit={onSubmit} />);

		userEvent.type(screen.getByPlaceholderText('e-mail'), 'test');
		fireEvent.click(screen.getByTestId('submitButton'));

		await waitFor(() => {
			expect(screen.getAllByText('Required').length).toBe(1);
			expect(screen.getByText('Invalid email')).toBeTruthy();
		});
	});

	it('Should handle submit correctly', async () => {
		const closeModel = jest.fn();
		const onSubmit = jest.fn();

		render(<LoginForm closeModal={closeModel} onSubmit={onSubmit} />);

		userEvent.type(screen.getByPlaceholderText('e-mail'), 'test@test.com');
		userEvent.type(screen.getByPlaceholderText('password'), 'wfsdfgsdfgfsdgfdg');
		fireEvent.click(screen.getByTestId('submitButton'));

		await waitFor(() => {
			expect(onSubmit).toHaveBeenCalledTimes(1);
			expect(onSubmit).toHaveBeenLastCalledWith({
				email: 'test@test.com',
				password: 'wfsdfgsdfgfsdgfdg',
			});
		});
	});

	it('Should run close modal when close modal is clicked', () => {
		const closeModel = jest.fn();
		const onSubmit = jest.fn();

		render(<LoginForm closeModal={closeModel} onSubmit={onSubmit} />);

		fireEvent.click(screen.getByText('\u00D7'));
		expect(closeModel).toHaveBeenCalledTimes(1);
	});
});
