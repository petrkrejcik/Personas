import { ACTIONS as PERSON } from '../person/person-actions';
import { ACTIONS as DATA_PROVIDER } from '../data-provider/actions';
import { ACTIONS as APP } from '../app/app-action';
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
        case PERSON.ADD: {
            const persons = state.persons.concat(action.payload);
            return Object.assign(Object.assign({}, state), { persons });
        }
        case PERSON.REMOVE: {
            if (!action.payload)
                return state;
            return Object.assign(Object.assign({}, state), { persons: state.persons.filter(person => person.id !== action.payload) });
        }
        case PERSON.editField: {
            return Object.assign(Object.assign({}, state), { personEdit: Object.assign(Object.assign({}, state.personEdit), { [action.payload.field]: action.payload.value }) });
        }
        case PERSON.editPerson: {
            return Object.assign(Object.assign({}, state), { personEdit: action.payload });
        }
        case DATA_PROVIDER.IS_LOGGED: {
            const dataProvider = Object.assign(Object.assign({}, state.dataProvider), { isLogged: action.payload });
            return Object.assign(Object.assign({}, state), { dataProvider });
        }
        case APP.setActiveElement: {
            return Object.assign(Object.assign({}, state), { activeElement: action.payload });
        }
    }
};
