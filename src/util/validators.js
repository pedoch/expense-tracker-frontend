export const required = (value) => {
	if (value.trim()) {
		return { isValid: true, message: '' };
	}
	return { isValid: false, message: 'This field is required' };
};

export const length = (config, value) => {
	if (config.min && value.trim().length < config.min) {
		return { isValid: false, message: `Minimum of ${config.min} characters` };
	}

	if (config.max && value.trim().length > config.max) {
		return { isValid: false, message: `Maximum of ${config.max} characters` };
	}

	return { isValid: true, message: '' };
};

export const email = (value) => {
	if (
		/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
			value
		)
	) {
		return { isValid: true, message: '' };
	}

	return { isValid: false, message: 'Please enter proper Email address' };
};

export const equal = (value1, value2) => {
	if (value1 === value2) {
		return { isValid: true, message: '' };
	}
	return { isValid: false, message: 'Not equal' };
};

export const adult = (dateString) => {
	let todayDate = new Date();
	let dateArray = dateString.split('/');
	dateArray = dateArray.map((num) => parseInt(num, 10));

	if (todayDate.getFullYear() - dateArray[2] >= 18) {
		if (todayDate.getFullYear() - dateArray[2] === 18) {
			if (todayDate.getMonth() >= dateArray[1]) {
				if (todayDate.getMonth() === dateArray[1]) {
					if (todayDate.getDate() >= dateArray[0]) {
						return { isValid: true, message: '' };
					}
					return { isValid: false, message: 'Not equal' };
				}
				return { isValid: true, message: '' };
			}
			return { isValid: false, message: 'Not old enough' };
		}
		return { isValid: true, message: '' };
	}
	return { isValid: false, message: 'Not old enough' };
};
