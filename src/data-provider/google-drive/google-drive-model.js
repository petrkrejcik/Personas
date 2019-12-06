import {
	login,
	fetchData,
	init as initApi,
	save as set,
	isLogged,
} from '../../data-provider/google-drive/google-drive-api';

let _isEnabled = false;

const onLibLoaded = async (options) => {
	const defaultOptions = {
		onSignInChange: () => {},
		onError: onError,
		defaultContent: [],
		// TODO: apiKey, etc
	};
	await initApi({...defaultOptions, ...options}).catch(console.error);
};

const onError = (error) => {
	alert(error);
};

// * @returns {{persons?: Object, updated?: number}}
/**
 * Get persons from local storage.
 */
const get = async () => {
	console.log('🔊', 'getting from grive');
	const response = await fetchData();
	if (typeof response !== 'object') {
		onError('Unknown reposonse from server');
		return null;
	}
	let persons = {};
	if (Array.isArray(response)) {
		// temporal
		response.forEach(person => {
			persons[person.id] = person;
		});
	} else {
		persons = response.persons;
	}
	const result = Object.keys(persons).reduce((all, id) => {
		all[id] = {
			...persons[id],
			name: unescape(persons[id].name),
		};
		return all;
	}, {});
	return {persons: result, updated: response.updated || 0};
};

const init = async () => {
	const response = await fetch('https://apis.google.com/js/api.js');
	eval(await response.text());
	await onLibLoaded();
	_isEnabled = true;
};

const isEnabled = () => _isEnabled;

export default {
	init,
	get,
	set,
	login,
	isLogged,
	isEnabled,
};
