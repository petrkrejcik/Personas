import {ACTIONS, setProviders, syncStart, syncEnd} from './actions'
import {ACTIONS as APP_ACTIONS} from '../app/app-action'
import {getState, dispatch, subscribeAfter} from '../store/store'
import {goToLogin} from '../router/router-actions';
import {ACTIONS as PERSON, saveAll} from '../person/person-actions'

/**
 * @typedef {Object} DataProvider
 * @property {() => void} init
 * @property {() => Promise<{persons?: Object, updated?: number}>} get
 * @property {(data: Object) => void} set
 * @property {() => void=} login
 * @property {() => boolean} isLogged
 * @property {() => boolean} isEnabled
 */

/**
 * Default result of fetching a data provider.
 */
const defaultResult = {persons: {}, updated: 0};

/**
 * Register data providers.
 * @param {DataProvider[]} providers
 */
export default (providers) => {
	subscribeAfter(run);
	providers.forEach(register);
	dispatch(setProviders(providers));
}

/**
 * Registers a single data provider.
 * @param {DataProvider} provider
 */
const register = (provider) => provider.init();

/**
 * Merges results of data providers.
 * Merges only `persons` property. Property `updated` is
 * copied from the newest.
 * @param {{persons: Object, updated: number}} newer
 * @param {{persons: Object, updated: number}} older
 * @returns {{persons: Object, updated: number}}
 */
const merge = (newer, older) => {
	if (older.updated > newer.updated) {
		const _newer = newer;
		newer = older;
		older = _newer;
	}
	return {
		persons: {...older.persons, ...newer.persons},
		updated: newer.updated,
	};
}

/**
 * Returns enabled data providers.
 * @returns {DataProvider[]}
 */
const getProviders = () => {
	const providers = getState().dataProviders || [];
	return providers.filter(isEnabled);
};

/**
 * Return true if a user is logged in the provider.
 * @param {DataProvider} provider
 */
const isLogged = (provider) => provider.isLogged();

/**
 * Return true if the provider is enabled.
 * @param {DataProvider} provider
 */
const isEnabled = (provider) => provider.isEnabled();

/**
 * Adds default values to a result of data provider.
 * @param {{persons?: Object, updated?: number}} result
 */
const cleanResult = (result) => ({...defaultResult, ...result});

/**
 * Loads data from all providers, merges them together (the newest wins)
 * and stores to local state and to all other providers.
 */
const sync = async () => {
	dispatch(syncStart());
	const providers = getProviders().filter(isLogged)
	const promisesGet = providers.map(get);
	const resultsDirty = await Promise.all(promisesGet);
	const results = resultsDirty.map(cleanResult);
	const {persons, updated} = results.reduce(merge, defaultResult);
	dispatch(saveAll(persons)); // save to local state

	const providersToSync = providers.filter((_, i) => results[i].updated !== updated)
	const promisesSet = providersToSync.map(set({persons, updated}));
	await Promise.all(promisesSet);
	dispatch(syncEnd());
}

const localToRemote = async () => {
	dispatch(syncStart());
	const setData = set({persons: getState().persons});
	const providers = getProviders().filter(isLogged)
	const promises = providers.map(setData);
	await Promise
		.all(promises)
		.catch((err) => console.error('Error during saving', err));
	dispatch(syncEnd());
}

const syncClick = async () => {
	const promises = getProviders()
		.filter(p => !p.isLogged())
		.map(loginProvider);
	await Promise
		.all(promises)
		.catch((err) => console.error('Error during logging in', err));
	sync();
}

/**
 * Login into the provider
 * @param {DataProvider} provider
 */
const loginProvider = (provider) => {
	if (!provider.isEnabled()) return Promise.resolve();
	if (!provider.login) return Promise.resolve();
	return provider.login();
}

/**
 * Reads data from data provider.
 * @param {DataProvider} provider
 */
const get = (provider) => provider.get();

/**
 * Stores data to the provider.
 * @param {Object} data
 */
const set = (data) => {
	const updated = (new Date()).getTime();
	const dataWithUpdated = {...data, updated: data.updated || updated};
	return async (dataProvider) => {
		await dataProvider.set(dataWithUpdated) || Promise.resolve();
	};
};

/**
 * Returns whether all data providers are functional.
 * @returns {boolean}
 */
export const isSyncOk = () => {
	const providers = getState().dataProviders || [];
	const allOk = providers.reduce((isOk, provider) => {
		return isOk && provider.isEnabled() && provider.isLogged();
	}, true);
	return allOk;
}

/**
 * Subscription function to state update.
 * @param {Action} action
 */
const run = (action) => {
	switch (action.type) {
		case APP_ACTIONS.init: {
			sync();
			break;
		}
		case ACTIONS.SYNC_CLICK: {
			syncClick();
			break;
		}
		case PERSON.save:
		case PERSON.REMOVE: {
			localToRemote();
			break;
		}
	}
	return;
};
