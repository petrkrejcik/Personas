const listeners = []
let state = {
	googleSyncEnabled: false,
	isSignedIn: false,
	persons: [],
	isLoading: true,
}

const getState = () => {
	return state
}

const setState = (newState) => {
	state = {
		...state,
		...newState,
	}
	dispatchUpdate()
}

const dispatchUpdate = () => {
	listeners.forEach(listener => {
		listener(getState())
	})
}

const addListener = (listener) => {
	listeners.push(listener)
}

export {addListener, getState, dispatchUpdate, setState}
