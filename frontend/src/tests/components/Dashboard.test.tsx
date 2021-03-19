import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import * as React from 'react';
import { Dashboard } from '../../components/Dashboard';
import { UserState } from '../../redux/user-slice';

describe('Test dashboard component', () => {
	it('should render username correctly', () => {
		const user: UserState = {
			userName: 'TestUsername',
			token: '',
			id: '',
			errors: {},
		};
		render(<Dashboard user={user} />);
		expect(screen.getByText('Hello, TestUsername')).toBeTruthy();
	});
});
