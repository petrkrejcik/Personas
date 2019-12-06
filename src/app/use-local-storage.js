// @ts-check
const storage = window.localStorage;

/**
 * Saves state to local storage.
 * @param {Object} persons
 */
const set = (persons) => {
	console.log('🔊', 'storing to localStorage')
	const json = JSON.stringify(persons)
	storage.setItem('persons', json)
}

/**
 * Get persons from local storage.
 */
const get = () => {
	const persons = JSON.parse(storage.getItem('persons'))
	return persons || {};
}

const isEnabled = () => true;
const isLogged = () => true;

/**
 * Initialization
 */
const init = () => {};

export default {
	init,
	get,
	set,
	isLogged,
	isEnabled,
}
