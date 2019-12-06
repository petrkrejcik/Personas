import {reducer} from './reducer';

/** @type {Array<Function>} */
const listeners = [];

/** @type {Array<Function>} */
const listenersAfter = [];

/** @type {State} */
let state = {
	persons: {},
};

/**
 * Returns state
 * @returns {State}
 */
const getState = () => {
	return state;
};

/**
 * Sets a new state
 * @param {State} newState
 */
const setState = (newState) => {
	state = {
		...state,
		...newState,
	};
};

/**
 * Dispatches an action which goes to the reducer.
 * @param {Action} action
 */
const dispatch = (action) => {
	const state = getState();
	console.log('🔊', action.type, action.payload || '');
	if (!action.type) return;
	const newState = reducer(state, action);
	setState(newState);
	listeners.forEach(listener => {
		listener(action);
	});
	listenersAfter.forEach(fn => {
		fn(action);
	});
};

/**
 * Subscribes to a state update.
 *
 * @param {Function} callback Called after state is updated
 */
const subscribe = (callback) => {
	listeners.push(callback);
};

/**
 * Adds listenersAfter to stack.
 * @param {Function} fn
 */
const subscribeAfter = (fn) => {
	listenersAfter.push(fn);
};

export {
	subscribeAfter,
	subscribe,
	dispatch,
	getState,
};
