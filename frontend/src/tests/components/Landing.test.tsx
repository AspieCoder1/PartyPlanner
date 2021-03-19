import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Landing } from '../../components/Landing';

describe('Landing page component', () => {
	it('Should render component correctly', () => {
		const user = {
			id: '',
			token: '',
			userName: '',
			errors: {},
		};

		const tree = renderer
			.create(
				<Landing loginUser={jest.fn()} user={user} registerUser={jest.fn()} setErrors={jest.fn()}/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
