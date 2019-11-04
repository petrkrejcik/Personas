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
 * @typedef {Object} State
 * @property {PersonEdit} personEdit
 * @property {any} activeElement
 * @property {Object} persons
 */
let state = {
	// googleSyncEnabled: false,
	// isSignedIn: false,
	persons: {},
	// isLoading: true,
	// view: 'loading',
	activeElement: null,
	personEdit: null,
}

/**
 * @returns {State}
 */
const getState = () => {
	return state
}

/**
 * @param {State} newState
 */
const setState = (newState) => {
	state = {
		...state,
		...newState,
	}
}

const dispatch = (action) => {
	const state = getState()
	// console.log('🔊', action.type, action.payload)
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
