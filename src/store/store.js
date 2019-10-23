// @flow
import {reducer} from '/store/reducer.js'

type ActionT = {
	type: string,
	payload?: any,
}

const listeners = []
let state = {
	googleSyncEnabled: false,
	isSignedIn: false,
	persons: {},
	isLoading: true,
	view: 'loading',
	editingPerson: null,
	activeElement: null,
	personEdit: {
		name: '',
		day: '1',
		month: '1',
		year: '1980',
	},
}

const getState = (): Object => {
	return state
}

const setState = (newState: Object) => {
	state = {
		...state,
		...newState,
	}
}

const dispatch = (action: ActionT) => {
	const state = getState()
	// console.log('🔊', action.type, action.payload)
	if (!action.type) return
	const newState = reducer(state, action)
	setState(newState)
	listeners.forEach(listener => {
		listener(action)
	})
}

const subscribe = (callback: Function) => {
	listeners.push(callback)
}

export {
	subscribe,
	dispatch,
	getState,
}
