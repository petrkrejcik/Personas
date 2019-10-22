import {ROUTES} from '/src/router/routes.js'

export const ACTIONS = {
	go: 'router/go',
}

export const goToAdd = () => ({type: ACTIONS.go, payload: ROUTES.add})
