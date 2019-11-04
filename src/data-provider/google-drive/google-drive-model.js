import {connect as connectGoogle, fetchData, init, save as apiSave} from '../../data-provider/google-drive/google-drive-api'
import {dispatch, subscribe, getState} from '../../store/store'
import {ACTIONS as DATA_PROVIDER} from '../../data-provider/actions'
import {ACTIONS as PERSON} from '../../person/person-actions'

const setup = () => {
	subscribe(action => {
		if (action === DATA_PROVIDER.SYNC_ENABLED) {
			console.info('👉', 'update google button', action.payload)
			updateGoogleButton(action.payload)
		}
	})
	const button = getGoogleSyncButton()
	if (button) {
		button.addEventListener('click', connectGoogle)
	}
}

const onLibLoaded = () => {
	const options = {
		onSignInChange: onSignInChange,
		onError: onError,
		defaultContent: [],
		// TODO: apiKey, etc
	}
	init(options).then(() => {
		dispatch({type: DATA_PROVIDER.SYNC_ENABLED, payload: true})
		// setState({'googleSyncEnabled': isInitiated})
	})
}

const onSignInChange = (isSignedIn) => {
	console.info('👉', 'onSignInChange')
	if (isSignedIn) {
		// setState({isSignedIn, view: 'loading'})
		dispatch({type: PERSON.FETCH})
	} else {
		dispatch({type: DATA_PROVIDER.IS_LOGGED, payload: false})
		// setState({isSignedIn, view: 'signIn'})
	}
}

const save = (payload) => {
	console.info('👉', 'call GDrive API from model', payload)
	return apiSave(payload) // TODO: rejected
}

const fetch = () => {
	fetchData().then(response => {
		if (!Array.isArray(response)) {
			onError('Unknown reposonse from server')
			return null
		}
		const persons = response.map(person => {
			return {
				...person,
				name: unescape(person.name),
			}
		})
		return persons
		// dispatch({type: PERSON.SET, payload: persons})
	})
}

const login = () => {
	connectGoogle()
}

const onError = (error) => {
	// setState({view: 'error'})
	alert(error)
}

const updateGoogleButton = (isEnabled) => {
	if (isEnabled) {
		const button = getGoogleSyncButton()
		if (button) {
			button.removeAttribute('disabled')
		}
	}
}

const getGoogleSyncButton = () => {
	return document.querySelector('button[data-prs="googleDriveButton"]')
}

export default function(options) {
	setup()

	return {
		save,
		onLibLoaded,
		fetch,
		login,
	}
}
