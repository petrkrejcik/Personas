// @flow
import {dispatch, getState, subscribe} from '/store/store.js'
import {ACTIONS} from '/data-provider/actions.js'
import {ACTIONS as PERSON} from '/person/person-actions.js'

const GDRIVE = 'gdrive'

const getSelectedStorage = () => {
	return GDRIVE
}

export function setup(dataProviderFactory) {
	const dataProvider = dataProviderFactory({
		onReady: () => dispatch(ACTIONS.FETCH),
	})
	subscribe(async action => {
		switch (action.type) {
			case PERSON.SYNC: {
				const persons = dataProvider.save(getState().persons)
				console.info('👉', 'persons synced', persons)
				break;
			}
			case PERSON.FETCH: {
				const persons = await dataProvider.fetch()
				dispatch({type: PERSON.SET, payload: persons})
				break;
			}
			case ACTIONS.LIB_LOADED: {
				dataProvider.onLibLoaded()
				break;
			}
			case ACTIONS.LOGIN: {
				dataProvider.login()
				break;
			}
		}
	})
}

export async function fetchLib() {
	const storageType = getSelectedStorage()
	if (storageType === GDRIVE) {
		const response = await fetch('https://apis.google.com/js/api.js')
		eval(await response.text())
		dispatch({type: ACTIONS.LIB_LOADED})
	}
}
