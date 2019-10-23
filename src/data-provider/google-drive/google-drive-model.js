// @flow
import {connect as connectGoogle, fetchData, init, save as apiSave} from '/data-provider/google-drive/google-drive-api.js'
import {dispatch, subscribe, getState} from '/store/store.js'
import {ACTIONS as DATA_PROVIDER} from '/data-provider/actions.js'
import {ACTIONS as PERSON} from '/person/person-actions.js'

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
	init(options).then((result) => {
		const {isInitiated} = result
		dispatch({type: DATA_PROVIDER.SYNC_ENABLED, payload: isInitiated})
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

const save = (payload): Promise<Array<Object>> => {
	console.info('👉', 'call GDrive API from model', payload)
	return apiSave(payload) // TODO: rejected
}

const fetch = () => {
	fetchData().then(response => {
		if (!Array.isArray(response)) {
			onError('Unknown reposonse from server')
			return
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

export default function(options): DataProviderT {
	setup()

	return {
		save,
		onLibLoaded,
		fetch,
		login,
	}
}
