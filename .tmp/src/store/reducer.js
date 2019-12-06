var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// @ts-check
import { ACTIONS as PERSON } from '../person/person-actions';
import { ACTIONS as DATA_PROVIDER } from '../data-provider/actions';
import { ACTIONS as APP } from '../app/app-action';
/**
 * Creates a new state based on action.
 *
 * @param {State} state state
 * @param {Action} action action
 */
export const reducer = (state, action) => {
    switch (action.type) {
        case PERSON.save: {
            const persons = Object.assign(Object.assign({}, state.persons), { [action.payload.id]: action.payload });
            return Object.assign(Object.assign({}, state), { persons });
        }
        case PERSON.SET: {
            return {
                persons: action.payload,
            };
        }
        // case PERSON.ADD: {
        // 	const persons = state.persons.concat(action.payload)
        // 	return {
        // 		...state,
        // 		persons,
        // 	}
        // }
        case PERSON.REMOVE: {
            const { payload } = action;
            if (typeof payload !== 'string')
                return state;
            // @ts-ignore
            const _a = state.persons, _b = payload, _ = _a[_b], persons = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            return Object.assign(Object.assign({}, state), { persons });
        }
        case PERSON.editField: {
            return Object.assign(Object.assign({}, state), { personEdit: Object.assign(Object.assign({}, state.personEdit), { [action.payload.field]: action.payload.value }) });
        }
        case PERSON.editPerson: {
            return Object.assign(Object.assign({}, state), { personEdit: action.payload });
        }
        case PERSON.TOGGLE_DELETE_OVERLAY: {
            return Object.assign(Object.assign({}, state), { deleteOverlayId: action.payload });
        }
        case PERSON.TOGGLE_ADD: {
            return Object.assign(Object.assign({}, state), { isAddingPerson: action.payload });
        }
        case DATA_PROVIDER.IS_LOGGED: {
            const dataProvider = Object.assign(Object.assign({}, state.dataProvider), { isLogged: action.payload });
            return Object.assign(Object.assign({}, state), { dataProvider });
        }
        case APP.setActiveElement: {
            return Object.assign(Object.assign({}, state), { activeElement: action.payload });
        }
        default:
            return state;
    }
};
