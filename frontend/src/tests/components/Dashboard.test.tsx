import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as React from 'react';
import { Dashboard } from '../../components/Dashboard';
import { UserState } from '../../redux/user-slice';

describe('Test dashboard component', () => {
	it('should render username correctly', () => {
		const getParties = jest.fn();
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

		render(<Dashboard getParties={getParties} user={user} parties={parties} />);
		expect(screen.getByText('Hello, TestUsername')).toBeTruthy();
	});
});
