import validator from 'validator';

interface newPartyObject {
	name: string;
	organiser: string;
	description: string;
	location: string;
	date: string;
	ageRate: boolean;
}

interface Ierrors {
	name?: string;
	organiser?: string;
	description?: string;
	location?: string;
	date?: string;
	ageRate?: string;
}

export const validateNewParty = (newParty: newPartyObject): Ierrors => {
  const errors: Ierrors = {};
  
	if (newParty.name.length < 5) {
		errors.name = 'Party name must be at least 5 characters long';
	}

	if (validator.isEmpty(newParty.name)) {
		errors.name = 'A party name is required';
	}

	if (validator.isEmpty(newParty.organiser)) {
		errors.organiser = 'An organiser is required';
	}

	if (newParty.description.length < 7) {
		errors.description = 'Party description must be at least 7 characters long';
	}

	if (validator.isEmpty(newParty.description)) {
		errors.description = 'A party description is required';
	}

	if (validator.isEmpty(newParty.location)) {
		errors.location = 'A party location is required';
	}

	if (validator.isEmpty(newParty.date)) {
		errors.date = 'A date is required';
	}

	if (validator.isBoolean(newParty.ageRate.toString())) {
		errors.ageRate = 'An age aproval is required';
	}

  return errors;
}