import { validateNewParty } from '../../src/validation/party-routes';

describe('New party creation body validation', () => {
	it('Should return empty object if everything valid', () => {
		const expectedErrors = {};

		const mockParty = {
			name: 'My Party',
			organiser: 'test user',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			time: '11:30',
			ageRate: false,
			publicParty: false,
		};
		const errors = validateNewParty(mockParty);
		expect(errors).toEqual(expectedErrors);
	});

	it('Should return error if name is not correct length', () => {
		const expectedErrors = {
			name: 'Party name is required and must be at least 5 characters long',
		};

		const mockParty = {
			name: ' ',
			organiser: 'test user',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			time: '11:30',
			ageRate: false,
			publicParty: false,
		};
		const errors = validateNewParty(mockParty);
		expect(errors).toEqual(expectedErrors);
	});

	it('Should return error if organiser name is not provided or of required length', () => {
		const expectedErrors = {
			organiser:
				'An organiser is required and must be at least 5 characters long',
		};

		const mockParty = {
			name: 'My Party',
			organiser: ' ',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			time: '11:30',
			ageRate: false,
			publicParty: false,
		};
		const errors = validateNewParty(mockParty);
		expect(errors).toEqual(expectedErrors);
	});

	it('Should return error if name is not correct length', () => {
		const expectedErrors = {
			description:
				'A party description is required and must be at least 7 characters long',
		};

		const mockParty = {
			name: 'my party',
			organiser: 'test user',
			description: '',
			location: 'This is a test location',
			date: '2021-04-04',
			time: '11:30',
			ageRate: false,
			publicParty: false,
		};
		const errors = validateNewParty(mockParty);
		expect(errors).toEqual(expectedErrors);
	});

	it('Should return error if location is not of a correct length', () => {
		const expectedErrors = {
			location:
				'A party location is required and must be at least 5 characters long',
		};

		const mockParty = {
			name: 'My Party',
			organiser: 'test user',
			description: 'This is a test party',
			location: '',
			date: '2021-04-04',
			time: '11:30',
			ageRate: false,
			publicParty: false,
		};
		const errors = validateNewParty(mockParty);
		expect(errors).toEqual(expectedErrors);
	});

	it('Should return error if date is not provided', () => {
		const expectedErrors = {
			date: 'A date is required',
		};

		const mockParty = {
			name: 'My Party',
			organiser: 'test user',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '',
			time: '11:30',
			ageRate: false,
			publicParty: false,
		};
		const errors = validateNewParty(mockParty);
		expect(errors).toEqual(expectedErrors);
	});

	it('Should return error if time is not provided', () => {
		const expectedErrors = {
			time: 'A time is required',
		};

		const mockParty = {
			name: 'My Party',
			organiser: 'test user',
			description: 'This is a test party',
			location: 'This is a test location',
			date: '2021-04-04',
			time: '',
			ageRate: false,
			publicParty: false,
		};
		const errors = validateNewParty(mockParty);
		expect(errors).toEqual(expectedErrors);
	});
});
