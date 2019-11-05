// @ts-check
import {dispatch, getState} from '../store/store'
import {parseDate} from '../utils/date'
import {editPerson, ACTIONS as PERSON} from '../person/person-actions'
import {goToEdit} from '../router/router-actions'

export const DEFAULTS = {
	name: '',
	day: '1',
	month: '1',
	year: '1980',
}

export const getProps = () => {
	const persons = Object.values(getState().persons)
		.map(person => {
			return {
				...person,
				age: getAge(person.birthday),
				daysToBirthday: getDaysToBirthday(person.birthday),
				seenBefore: getSeenBefore(person.seen),
				onEditClick: id => {
					// TODO: Move to separate function
					const person = getState().persons[id]
					const {day, month, year} = parseDate(person.birthday)
					dispatch(editPerson({...person, day, month, year}))
					dispatch(goToEdit(id))
				},
				onRemoveClick: toggleRemoveOverlay,
				cancelRemove: toggleRemoveOverlay,
				remove: remove,
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

const getValidationError = (name, birthday) => {
	if (!name) {
		return 'Empty name'
	}
	if (!birthday.match(/^\d{4}-\d{2}-\d{2}$/)) {
		return 'Wrong birthday format. Use YYYY-MM-DD.'
	}
	return null
}

// const resetSeen = (id) => {
// 	const persons = getState().persons.map((person) => {
// 		if (id !== person.id) return person
// 		const now = new Date()
// 		const year = now.getUTCFullYear()
// 		const month = (now.getMonth() + 1 + '').padStart(2, '0')
// 		const day = (now.getDate() + '').padStart(2, '0')
// 		return {
// 			...person,
// 			seen: `${year}-${month}-${day}`,
// 		}
// 	})
// 	dispatch({type: PERSON.SYNC})
// }

/**
 * Shows or hide remove overlay.
 * @param {string} id 
 */
const toggleRemoveOverlay = id => {
	dispatch({type: PERSON.TOGGLE_DELETE_OVERLAY, payload: id})
}

/**
 * Removes a person.
 * @param {string} id 
 */
const remove = id => {
	dispatch({type: PERSON.REMOVE, payload: id})
	dispatch({type: PERSON.SYNC})
}
