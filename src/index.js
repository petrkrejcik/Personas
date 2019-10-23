// @flow
// import dataProvider from '/data-provider/filesystem/filesystem.js'
import dataProvider from '/data-provider/google-drive/google-drive-model.js'
// import dataProvider from '/data-provider/google-drive/google-drive-model.js'
import {setup as setupOverlay} from '/overlay.js'
import {setup as setupDataProvider, fetchLib} from '/data-provider/data-provider.js'
import {ACTIONS} from '/data-provider/actions.js'
import * as store from '/store/store.js'
import {setup as setupRouter} from '/router/router.js'

const setup = () => {
	fetchLib()
	// setupDataProvider(dataProvider)
	// setupOverlay()
	setupRouter()
}

window.getState = store.getState // TODO: for debug only
if (window.Cypress) {
	// For Cypress testing library
	window.store = store
}

export {
	setup,
}
