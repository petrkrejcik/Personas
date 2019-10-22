// @ts-check
export const ACTIONS = {
    editField: 'person/editField',
    editPerson: 'person/editPerson',
    save: 'person/save',
    SYNC: 'person/sync',
    FETCH: 'person/fetch',
    SET: 'person/set',
    ADD: 'person/add',
    REMOVE: 'person/remove',
    TOGGLE_DELETE_OVERLAY: 'person/toggleDeleteOverlay',
    TOGGLE_ADD: 'person/toggleAdd',
};
/**
 * Sets a value to a one field in `personEdit` value in state.
 * @param {string} field
 * @param {any} value
 */
export const editField = (field, value) => ({ type: ACTIONS.editField, payload: { field, value } });
/**
 * Sets person as `personEdit` into state.
 * @param {PersonEdit?} person
 */
export const editPerson = (person) => ({ type: ACTIONS.editPerson, payload: person });
export const save = (person) => ({ type: ACTIONS.save, payload: person });
export const toggleAdd = (isVisible) => ({ type: ACTIONS.TOGGLE_ADD, payload: isVisible });
