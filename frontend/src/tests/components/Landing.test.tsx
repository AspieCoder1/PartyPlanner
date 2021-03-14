import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Landing } from '../../components/Landing';

describe('Landing page component', () => {
	it('Should render component correctly', () => {
		const tree = renderer.create(<Landing registerUser={jest.fn()} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
