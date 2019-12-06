export const ACTIONS = {
    editField: 'person/editField',
    editPerson: 'person/editPerson',
    save: 'person/save',
    SYNC: 'person/sync',
    FETCH: 'person/fetch',
    SET: 'person/set',
    ADD: 'person/add',
    REMOVE: 'person/remove',
};
export const editField = (field, value) => ({ type: ACTIONS.editField, payload: { field, value } });
export const editPerson = (person) => ({ type: ACTIONS.editPerson, payload: person });
export const save = (person) => ({ type: ACTIONS.save, payload: person });
