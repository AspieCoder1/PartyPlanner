import validator from 'validator';

type Updates = {
	name: string;
	description: string;
	location: string;
	date: string;
	time: string;
	ageRate: boolean;
	publicParty: boolean;
};

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

	if (validator.isEmpty(newParty.organiser)) {
		errors.organiser = 'An organiser is required';
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

export const validateUpdates = (updates: Updates): Ierrors => {
	const errors: Ierrors = {};

	if (validator.isEmpty(updates.name)) {
		errors.name = 'A party name is required';
	}

	if (updates.name.length < 5) {
		errors.name =
			'Party name is required and must be at least 5 characters long';
	}

	if (
		validator.isEmpty(updates.description) ||
		updates.description.length < 7
	) {
		errors.description =
			'A party description is required and must be at least 7 characters long';
	}

	if (validator.isEmpty(updates.location) || updates.location.length < 5) {
		errors.location =
			'A party location is required and must be at least 5 characters long';
	}

	if (validator.isEmpty(updates.date)) {
		errors.date = 'A date is required';
	}

	if (validator.isEmpty(updates.time)) {
		errors.time = 'A time is required';
	}

	return errors;
};
