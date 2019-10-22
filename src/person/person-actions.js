export const ACTIONS = {
	edit: 'person/edit', // when typing in add/edit fields
	save: 'person/save', // when saving added/edited person
	SYNC: 'person/sync',
	FETCH: 'person/fetch',
	SET: 'person/set', // when setting from remote storage
	ADD: 'person/add',
	REMOVE: 'person/remove',
}

export const edit = (field, value) => ({type: ACTIONS.edit, payload: {field, value}})
export const save = (person) => ({type: ACTIONS.save, payload: person})
