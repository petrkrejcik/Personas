import {subscribe, dispatch, getState} from '/src/store/store.js'
import * as view from '/src/person/persons-view.js'
import {createIso} from '/src/utils/date.js'
import {ACTIONS as DATA_PROVIDER} from '/src/data-provider/actions.js'
import {ACTIONS as PERSON} from '/src/person/person-actions.js'

const setup = () => {
	subscribe(update)
}

const update = () => {
	updatePersons()
}

// const updatePersons = () => {
// 	view.clearPersons()
// 	renderPersons(getState().persons)
// }

// const renderPersons = (persons) => {
// 	const personsView = persons
// 		.map(person => {
// 			return {
// 				...person,
// 				age: getAge(person.birthday),
// 				daysToBirthday: getDaysToBirthday(person.birthday),
// 				seenBefore: getSeenBefore(person.seen),
// 				handleEdit: edit,
// 				handleRemove: remove,
// 			}
// 		})
// 		.sort(sortByBirthday)
// 	view.renderPersons(personsView, addPerson)
// }

const getProps = () => {
	const persons = getState().persons
		.map(person => {
			return {
				...person,
				age: getAge(person.birthday),
				daysToBirthday: getDaysToBirthday(person.birthday),
				seenBefore: getSeenBefore(person.seen),
				handleEdit: edit,
				handleRemove: remove,
			}
		})
		.sort(sortByBirthday)
	return {persons}
}

const sortByBirthday = (personA, personB) => {
	if (!personA.birthday || !personB.birthday) return 0
	return getDaysToBirthday(personA.birthday) - getDaysToBirthday(personB.birthday)
}

const getAge = (isoDay) => {
	if (!isoDay) return null
	const now = Date.now()
	const date = new Date(isoDay).getTime()
	const diff = new Date(now - date)
	const age = Math.abs(diff.getUTCFullYear() - 1970)
	return age
}

const getSeenBefore = (isoDay) => {
	if (!isoDay) return null
	const now = Date.now()
	const date = new Date(isoDay).getTime()
	const days = Math.round((now - date) / 1000 / 60 / 60/ 24)
	return days
}

const getDaysToBirthday = (isoDate) => {
	if (!isoDate) return null
	const birthday = new Date(isoDate)
	const nowYear = new Date().getUTCFullYear()
	const diff = Date.now() - new Date(`${nowYear}-${birthday.getMonth() + 1}-${birthday.getDate()}`).getTime()
	let days
	if (diff < 0) {
		// this year
		days = Math.abs(Math.ceil(diff / 1000 / 60 / 60 / 24))
	} else {
		// next year
		const diffNext = Date.now() - new Date(`${nowYear + 1}-${birthday.getMonth() + 1}-${birthday.getDate()}`).getTime()
		days = Math.abs(Math.ceil(diffNext / 1000 / 60 / 60 / 24))
	}
	return days
}

const addPerson = (name, day, month, year) => {
	const birthday = createIso(day, month, year)
	const error = getValidationError(name, birthday)
	if (error) {
		alert(error)
		return
	}
	const payload = {name, birthday}
	dispatch({type: PERSON.ADD, payload})
	dispatch({type: PERSON.SYNC})
}

const editPerson = (id, name, day, month, year) => {
	const birthday = createIso(day, month, year)
	const error = getValidationError(name, birthday)
	if (error) {
		alert(error)
		return
	}
	dispatch({type: PERSON.EDIT, payload: {id, name, birthday}})
	dispatch({type: PERSON.SYNC})
}

const getValidationError = (name, birthday) => {
	if (!name) {
		return 'Empty name'
	}
	if (!birthday.match(/^\d{4}-\d{2}-\d{2}$/)) {
		return 'Wrong birthday format. Use YYYY-MM-DD.'
	}
	return null
}

const resetSeen = (id) => {
	const persons = getState().persons.map((person) => {
		if (id !== person.id) return person
		const now = new Date()
		const year = now.getUTCFullYear()
		const month = (now.getMonth() + 1 + '').padStart(2, '0')
		const day = (now.getDate() + '').padStart(2, '0')
		return {
			...person,
			seen: `${year}-${month}-${day}`,
		}
	})
	dispatch({type: PERSON.SYNC})
}

const edit = (id) => {
	// setState({view: 'edit', editingPerson: id})
}
const remove = (id) => {
	if (!confirm('Delete person?')) return
	dispatch({type: PERSON.REMOVE, payload: id})
	dispatch({type: PERSON.SYNC})
}

// export {getProps, editPerson, resetSeen, setup}
export {getProps}
