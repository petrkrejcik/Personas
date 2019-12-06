import useDataProviders from './data-provider/data-provider-middleware';
import * as store from './store/store'
import {setup as setupRouter} from './router/router'
import localStorage from './app/use-local-storage'
import {ACTIONS} from './app/app-action'
import googleDrive from './data-provider/google-drive/google-drive-model';
import './app/app.css'

// import {createId} from './person/person-util'
// const names = [
// 	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
// ].forEach(name => {
// 	store.dispatch({type: 'person/save', payload: {
// 		id: createId(name),
// 		name: name,
// 		birthday: '2000-01-01',
// 	}})
// })

window.store = store; // TODO: for debug only
if (window.Cypress) {
	// For Cypress testing library
	window.store = store
}

// useDataProviders([localStorage]);
useDataProviders([localStorage, googleDrive]);

setupRouter();
store.dispatch({type: ACTIONS.init});
