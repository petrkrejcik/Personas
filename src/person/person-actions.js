export const ACTIONS = {
	EDIT: 'person/edit',
	SYNC: 'person/sync',
	FETCH: 'person/fetch',
	SET: 'person/set', // when setting from remote storage
	ADD: 'person/add',
	REMOVE: 'person/remove',
	TYPE_NAME: 'person/type-name',
}

export const changeName = (text) => ({type: ACTIONS.TYPE_NAME, payload: text})
