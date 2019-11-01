import {reducer} from '/store/reducer.js'

const listeners = []
let state = {
	googleSyncEnabled: false,
	isSignedIn: false,
	persons: {},
	isLoading: true,
	view: 'loading',
	activeElement: null,
	personEdit: {},
}

const getState = () => {
	return state
}

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
