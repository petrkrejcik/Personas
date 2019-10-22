// @flow
import {subscribe, dispatch, getState} from '/src/store/store.js'
import {ACTIONS as DATA_PROVIDER} from '/src/data-provider/actions.js'
import Login from '/src/login/login-view.js'
import Header from '/src/header/header.js'
import Persons from '/src/person/persons-view.js'
import Add from '/src/person/person-add.js'
import {ROUTES} from '/src/router/routes.js'
import {ACTIONS} from '/src/router/router-actions.js'
import {getProps as getPersons} from '/src/person/persons-model.js'
import {getActiveElement} from '/src/app/app-action.js'

const getRoute = () => {
	return window.location.pathname
}

const go = path => {
	if (path === getRoute()) return
	history.pushState({}, '', path)
}

const route = action => {
	if (action.type === ACTIONS.go) {
		go(action.payload)
	}
	const route = getRoute()
	let body = []
	switch (route) {
		case ROUTES.login: {
			body.push(
				Login({
					handleLoginClick: () => dispatch({type: DATA_PROVIDER.LOGIN}),
				})
			)
			break;
		}
		case ROUTES.add: {
			body.push(
				Header(),
				Add(),
			)
			break;
		}
		default: {
			body = [
				Header(),
				Persons(getPersons()),
			]
		}
	}
	const app = document.getElementById('app')
	app.innerHTML = ''
	body.map((el) => app.appendChild(el))
	const activeElement = getActiveElement()
	if (activeElement) {
		activeElement.focus()
	}
}

export const setup = () => {
	window.onpopstate = route
	subscribe(route)
}
