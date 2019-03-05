import {connect, fetchData, init} from './google-drive-api.js'
import {addListener, getState, setState} from './state.js'

const setup = () => {
	addListener(update)
	getGoogleSyncButton().addEventListener('click', connect)
	window.getState = getState
}

const libLoaded = () => {
	const options = {
		onSignInChange: onSignInChange,
		onUpdate: updatePersons,
		onError: onError,
		defaultContent: [],
		// TODO: apiKey, etc
	}
	init(options).then((result) => {
		const {isInitiated} = result
		setState({'googleSyncEnabled': isInitiated})
	})
}

const update = (state) => {
	updateGoogleButton(state.googleSyncEnabled)
}

const updatePersons = (persons) => {
	if (!Array.isArray(persons)) {
		onError('Unknown reposonse from server')
	}
	persons = persons.map(person => {
		return {
			...person,
			name: unescape(person.name),
			id: Math.random().toString(36).substring(10),
		}
	})
	setState({persons, view: 'persons'})
}

const onSignInChange = (isSignedIn) => {
	if (isSignedIn) {
		setState({isSignedIn, view: 'loading'})
		fetchData().then(updatePersons)
	} else {
		setState({isSignedIn, view: 'signIn'})
	}
}

const onError = (error) => {
	setState({view: 'error'})
	alert(error)
}

const updateGoogleButton = (isEnabled) => {
	if (isEnabled) {
		getGoogleSyncButton().removeAttribute('disabled')
	}
}

const getGoogleSyncButton = () => {
	return document.querySelector('button[data-prs="googleDriveButton"]')
}

export {libLoaded, setup}
