import {ROUTES} from '/router/routes.js'

export const ACTIONS = {
	home: '',
	go: 'router/go',
}

export const goToAdd = () => ({type: ACTIONS.go, payload: ROUTES.add})
export const goToEdit = (id) => ({type: ACTIONS.go, payload: `${ROUTES.edit}/${id}`})
export const goToHome = () => ({type: ACTIONS.go, payload: ROUTES.home})
