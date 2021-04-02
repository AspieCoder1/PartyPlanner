import * as React from 'react';
import LandingHeader from '../../components/LandingHeader';
import { render, screen } from '@testing-library/react';

describe('<LandingHeader/>', () => {
	it('Should render component correctly', () => {
		render(
			<LandingHeader onClickLogin={jest.fn()} onClickRegister={jest.fn()} />
		);
		expect(screen.getByText('Login')).toBeTruthy();
		expect(screen.getByText('Register')).toBeTruthy();
	});

	it('should handle login click', () => {
		const clickLogin = jest.fn();
		const clickRegister = jest.fn();

		render(
			<LandingHeader
				onClickLogin={clickLogin}
				onClickRegister={clickRegister}
			/>
		);
		screen.getByText('Login').click();
		expect(clickLogin).toHaveBeenCalledTimes(1);
	});

	it('should handle register click', () => {
		const clickLogin = jest.fn();
		const clickRegister = jest.fn();

		render(
			<LandingHeader
				onClickLogin={clickLogin}
				onClickRegister={clickRegister}
			/>
		);
		screen.getByText('Register').click();
		expect(clickRegister).toHaveBeenCalledTimes(1);
	});
});
