import {addListener, getState, setState} from './state.js'
import {updateContent} from './google-drive-api.js'
import * as view from './persons-view.js'
import {createIso} from './utils/date.js'

const setup = () => {
	addListener(update)
}

const update = () => {
	updatePersons()
}

const updatePersons = () => {
	view.clearPersons()
	renderPersons(getState().persons)
}

const renderPersons = (persons) => {
	const personsView = persons
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
	view.renderPersons(personsView, addPerson)
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
	setState({view: 'loading'})
	updateContent(getState().persons.concat({name, birthday}))
}

const editPerson = (id, name, day, month, year) => {
	const birthday = createIso(day, month, year)
	const error = getValidationError(name, birthday)
	if (error) {
		alert(error)
		return
	}
	const persons = getState().persons.map(person => {
		if (person.id !== id) return person
		return {
			...person,
			name,
			birthday
		}
	})
	setState({view: 'loading'})
	updateContent(persons)
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
	setState({view: 'loading'})
	updateContent(persons)
}

const edit = (id) => {
	setState({view: 'edit', editingPerson: id})
}
const remove = (id) => {
	if (!confirm('Delete person?')) return
	const persons = getState().persons.filter((person) => person.id !== id)
	setState({view: 'loading'})
	updateContent(persons)
}

export {editPerson, resetSeen, setup}