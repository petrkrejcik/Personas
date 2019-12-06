import {ROUTES} from '../router/routes'

export const ACTIONS = {
	home: '',
	login: '/login',
	go: 'router/go',
}

export const goToAdd = () => ({type: ACTIONS.go, payload: ROUTES.add})
export const goToEdit = (id) => ({type: ACTIONS.go, payload: `${ROUTES.edit}/${id}`})
export const goToHome = () => ({type: ACTIONS.go, payload: ROUTES.home})
export const goToLogin = () => ({type: ACTIONS.go, payload: ROUTES.login})
