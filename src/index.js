/// <reference path="types.d.ts" />
// @ts-check

// import dataProvider from './data-provider/filesystem/filesystem'
import dataProvider from './data-provider/google-drive/google-drive-model'
// import dataProvider from './data-provider/google-drive/google-drive-model'
import {setup as setupDataProvider, fetchLib} from './data-provider/data-provider'
import {ACTIONS} from './data-provider/actions'
import * as store from './store/store'
import {setup as setupRouter} from './router/router'

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
