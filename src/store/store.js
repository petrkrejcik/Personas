// @ts-check
import {reducer} from './reducer'

const listeners = []

/**
 * @typedef {Object} PersonEdit
 * @property {string} name
 * @property {string} day
 * @property {string} month
 * @property {string} year
 */

/**
 * @typedef {Object} Action
 * @property {string} type
 * @property {any} [payload]
 */

/**
 * @typedef {Object} State
 * @property {PersonEdit} personEdit
 * @property {any} activeElement
 * @property {Object} persons
 * @property {string} deleteOverlayId
 */
let state = {
	// googleSyncEnabled: false,
	// isSignedIn: false,
	persons: {},
	// isLoading: true,
	// view: 'loading',
	activeElement: null,
	personEdit: null,
	deleteOverlayId: null,
}

/**
 * Returns state
 * @returns {State}
 */
const getState = () => {
	return state
}

/**
 * Sets a new state
 * @param {State} newState
 */
const setState = (newState) => {
	state = {
		...state,
		...newState,
	}
}

/**
 * Dispatches an action which goes to the reducer.
 * @param {Action} action Action
 */
const dispatch = (action) => {
	const state = getState()
	console.log('🔊', action.type, action.payload)
	if (!action.type) return
	const newState = reducer(state, action)
	setState(newState)
	listeners.forEach(listener => {
		listener(action)
	})
}

const subscribe = (callback) => {
	listeners.push(callback)
}

export {
	subscribe,
	dispatch,
	getState,
}
