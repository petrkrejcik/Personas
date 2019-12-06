// @ts-check
import {ACTIONS as PERSON} from '../person/person-actions'
import {ACTIONS as DATA_PROVIDER} from '../data-provider/actions'
import {ACTIONS as APP} from '../app/app-action'

/**
 * Creates a new state based on action.
 *
 * @param {State} state state
 * @param {Action} action action
 */
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
		// case PERSON.ADD: {
		// 	const persons = state.persons.concat(action.payload)
		// 	return {
		// 		...state,
		// 		persons,
		// 	}
		// }
		case PERSON.REMOVE: {
			const {payload} = action
			if (typeof payload !== 'string') return state
			// @ts-ignore
			const {[payload]: _, ...persons} = state.persons
			return {
				...state,
				persons,
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
		case PERSON.TOGGLE_DELETE_OVERLAY: {
			return {
				...state,
				deleteOverlayId: action.payload,
			}
		}
		case PERSON.TOGGLE_ADD: {
			return {
				...state,
				isAddingPerson: action.payload,
			}
		}
		case APP.setActiveElement: {
			return {
				...state,
				activeElement: action.payload,
			}
		}
		case DATA_PROVIDER.SYNC_START: {
			return {
				...state,
				isSyncing: true,
			}
		}
		case DATA_PROVIDER.SYNC_END: {
			return {
				...state,
				isSyncing: false,
			}
		}
		case DATA_PROVIDER.SET: {
			return {
				...state,
				dataProviders: [...action.payload],
			}
		}
		default:
			return state
	}
}
