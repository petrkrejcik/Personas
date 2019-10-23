// @flow
import {subscribe, dispatch, getState} from '/store/store.js'
import {ACTIONS as DATA_PROVIDER} from '/data-provider/actions.js'
import Login from '/login/login-view.js'
import Header from '/header/header.js'
import Persons from '/person/persons-view.js'
import Add from '/person/person-add.js'
import {ROUTES} from '/router/routes.js'
import {ACTIONS} from '/router/router-actions.js'
import {getProps as getPersons} from '/person/persons-model.js'
import {getActiveElement} from '/app/app-action.js'

const getRoute = () => {
	return window.location.pathname.substring(1).split('/')[0]
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
		case ROUTES.edit: {
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
