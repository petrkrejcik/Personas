// @flow
import {ACTIONS as PERSON} from '/person/person-actions.js'
import {ACTIONS as DATA_PROVIDER} from '/data-provider/actions.js'
import {ACTIONS as APP} from '/app/app-action.js'

export const reducer = (state: Object, action: ActionT) => {
	switch (action.type) {
		case PERSON.save: {
			const persons = {
				...state.persons,
				[action.payload.id]: action.payload
			}
			return {
				...state,
				persons,
			}
		}
		case PERSON.SET: {
			return {
				persons: action.payload,
			}
		}
		case PERSON.ADD: {
			const persons = state.persons.concat(action.payload)
			return {
				...state,
				persons,
			}
		}
		case PERSON.REMOVE: {
			if (!action.payload) return state
			return {
				...state,
				persons: state.persons.filter(person => person.id !== action.payload),
			}
		}
		case PERSON.edit: {
			return {
				...state,
				personEdit: {
					...state.personEdit,
					[action.payload.field]: action.payload.value,
				},
			}
		}
		case DATA_PROVIDER.IS_LOGGED: {
			const dataProvider = {
				...state.dataProvider,
				isLogged: action.payload,
			}
			return {
				...state,
				dataProvider,
			}
		}
		case APP.setActiveElement: {
			return {
				...state,
				activeElement: action.payload,
			}
		}
	}
}
