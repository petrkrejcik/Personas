// @flow
import {ACTIONS as PERSON} from '/src/person/person-actions.js'
import {ACTIONS as DATA_PROVIDER} from '/src/data-provider/actions.js'
import {ACTIONS as APP} from '/src/app/app-action.js'

export const reducer = (state: Object, action: ActionT) => {
	switch (action.type) {
		case PERSON.EDIT: {
				const persons = state.persons.map(person => {
					if (!action.payload || !action.payload.id) return person
					if (person.id !== action.payload.id) return person
					return {
						...person,
						...action.payload,
					}
				})
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
		case PERSON.TYPE_NAME: {
			return {
				...state,
				personEditName: action.payload,
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
