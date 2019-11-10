// @ts-check
/// <reference path="types.d.ts" />
/// <reference path="person/person-types.d.ts" />
/// <reference path="store/store-types.d.ts" />

// import dataProvider from './data-provider/filesystem/filesystem'
import dataProvider from './data-provider/google-drive/google-drive-model'
// import dataProvider from './data-provider/google-drive/google-drive-model'
import {setup as setupDataProvider, fetchLib} from './data-provider/data-provider'
import * as store from './store/store'
import {setup as setupRouter} from './router/router'
import './app/app.css'

export const setup = () => {
	fetchLib()
	// setupDataProvider(dataProvider)
	setupRouter()
}

window.getState = store.getState // TODO: for debug only
if (window.Cypress) {
	// For Cypress testing library
	window.store = store
}
