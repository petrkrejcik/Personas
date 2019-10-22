import {ROUTES} from '/src/router/routes.js'

export const ACTIONS = {
	home: '',
	go: 'router/go',
}

export const goToAdd = () => ({type: ACTIONS.go, payload: ROUTES.add})
export const goToHome = () => ({type: ACTIONS.go, payload: ROUTES.home})
