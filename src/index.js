// @flow
// import dataProvider from '/src/data-provider/filesystem/filesystem.js'
import dataProvider from '/src/data-provider/google-drive/google-drive-model.js'
import {setup as setupOverlay} from '/src/overlay.js'
import {setup as setupDataProvider, fetchLib} from '/src/data-provider/data-provider.js'
import {ACTIONS} from '/src/data-provider/actions.js'
import {dispatch, getState} from '/src/store/store.js'
import {setup as setupRouter} from '/src/router/router.js'

const setup = () => {
	fetchLib()
	setupDataProvider(dataProvider)
	// setupOverlay()
	setupRouter()
}

window.getState = getState // TODO: for debug only

export {
	setup,
}
