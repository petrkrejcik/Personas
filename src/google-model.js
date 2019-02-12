import {
	connect as connectGoogle,
	init as googleInit
} from './google-drive.js'
import {addListener, dispatchUpdate, getState, setState} from './state.js'

const setup = () => {
	addListener(update)
	getGoogleSyncButton().addEventListener('click', connectGoogle)
}

const update = (state) => {
	updateGoogleButton(state.googleSyncEnabled)
}

const libLoaded = () => {
	googleInit().then((persons) => {
		setState({
			'googleSyncEnabled': true,
			persons
		})
	})
}

const updateGoogleButton = (isEnabled) => {
	if (isEnabled) {
		getGoogleSyncButton().removeAttribute('disabled')
	}
}

const getGoogleSyncButton = () => {
	return document.querySelector('button[data-ps="googlePlusSync"]')
}

export {libLoaded, setup}
