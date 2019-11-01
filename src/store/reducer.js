import {ACTIONS as PERSON} from '/person/person-actions.js'
import {ACTIONS as DATA_PROVIDER} from '/data-provider/actions.js'
import {ACTIONS as APP} from '/app/app-action.js'

export const reducer = (state, action) => {
	switch (action.type) {
		case PERSON.save: {
			const persons = {
				...state.persons,
				[action.payload.id]: action.payload,
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
		case PERSON.editField: {
			return {
				...state,
				personEdit: {
					...state.personEdit,
					[action.payload.field]: action.payload.value,
				},
			}
		}
		case PERSON.editPerson: {
			return {
				...state,
				personEdit: action.payload,
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
