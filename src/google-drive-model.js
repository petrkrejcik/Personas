import {connect, fetchData, init} from './google-drive-api.js'
import {addListener, dispatchUpdate, getState, setState} from './state.js'

const setup = () => {
	addListener(update)
	getGoogleSyncButton().addEventListener('click', connect)
}

const libLoaded = () => {
	const options = {
		onSignInChange: onSignInChange,
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
	setState({persons, isLoading: false})
}

const onSignInChange = (isSignedIn) => {
	if (isSignedIn) {
		setState({isSignedIn, isLoading: true})
		fetchData().then(updatePersons)
	} else {
		setState({isSignedIn, isLoading: false})
	}
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
