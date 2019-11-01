export const ACTIONS = {
	editField: 'person/editField', // when typing in add/edit fields
	editPerson: 'person/editPerson', // when setting all fields to edit
	save: 'person/save', // when saving added/edited person
	SYNC: 'person/sync',
	FETCH: 'person/fetch',
	SET: 'person/set', // when setting from remote storage
	ADD: 'person/add',
	REMOVE: 'person/remove',
}

export const editField = (field, value) => ({type: ACTIONS.editField, payload: {field, value}})
export const editPerson = (person) => ({type: ACTIONS.editPerson, payload: person})
export const save = (person) => ({type: ACTIONS.save, payload: person})
