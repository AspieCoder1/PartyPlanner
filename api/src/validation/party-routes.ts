import validator from 'validator';

interface newPartyObject {
	name: string;
	organiser: string;
	description: string;
	location: string;
	date: string;
	time: string;
	ageRate?: boolean;
	attendeesID?: string[];
	todoID?: string;
	publicParty: boolean;
}

interface Ierrors {
	name?: string;
	organiser?: string;
	description?: string;
	location?: string;
	date?: string;
	time?: string;
	ageRate?: string;
}

export const validateNewParty = (newParty: newPartyObject): Ierrors => {
	const errors: Ierrors = {};

	if (validator.isEmpty(newParty.name)) {
		errors.name = 'A party name is required';
	}

	if (newParty.name.length < 5) {
		errors.name =
			'Party name is required and must be at least 5 characters long';
	}

	if (validator.isEmpty(newParty.organiser) || newParty.organiser.length < 5) {
		errors.organiser =
			'An organiser is required and must be at least 5 characters long';
	}

	if (
		validator.isEmpty(newParty.description) ||
		newParty.description.length < 7
	) {
		errors.description =
			'A party description is required and must be at least 7 characters long';
	}

	if (validator.isEmpty(newParty.location) || newParty.location.length < 5) {
		errors.location =
			'A party location is required and must be at least 5 characters long';
	}

	if (validator.isEmpty(newParty.date)) {
		errors.date = 'A date is required';
	}

	if (validator.isEmpty(newParty.time)) {
		errors.time = 'A time is required';
	}

	return errors;
};
