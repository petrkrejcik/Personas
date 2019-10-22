// @flow
import {birthdayPicker} from '/src/components/birthday-picker.js'
import ICONS from '/src/components/icons.js'
import {formatDMY} from '/src/utils/date.js'

const renderPersons = (persons, handleAdd) => {
	const el = document.createElement('div')
	el.classList.add('persons')
	el.setAttribute('data-cy', 'persons')
	persons
		.map(renderPerson)
		.forEach(person => el.appendChild(person))
	el.appendChild(renderAdd(handleAdd))
	return el
}

const renderEmpty = () => {
	const el = document.createElement('div')
	el.classList.add('personsEmpty')
	el.setAttribute('data-cy', 'personsEmpty')
	el.innerText = 'No persons created yet.'
	return el
}

const renderPerson = (person) => {
	const el = document.createElement('div')
	el.classList.add('person')
	el.setAttribute('data-cy', 'person')
	const fields = [
		renderTitle(person.name),
		renderBirthday(person.birthday, person.age, person.daysToBirthday),
		renderSeen(person.seenBefore),
		...renderCustomTexts(person.customTexts),
	]
	fields
	.filter(Boolean)
	.forEach(field => el.appendChild(field))
	const edit = document.createElement('div')
	const remove = document.createElement('div')
	edit.classList.add('icon-edit', 'icon')
	remove.classList.add('icon-remove', 'icon')
	edit.addEventListener('click', person.handleEdit.bind(null, person.id))
	remove.addEventListener('click', person.handleRemove.bind(null, person.id))
	remove.setAttribute('data-cy', 'remove')
	edit.innerHTML = ICONS.edit
	remove.innerHTML = ICONS.remove
	el.appendChild(remove)
	el.appendChild(edit)
	return el
}

const renderTitle = (value) => {
	const el = renderText(value)
	el.classList.add('person-title')
	return el
}

const renderText = (value) => {
	const el = document.createElement('div')
	el.innerHTML = value
	return el
}

const renderBirthday = (birthday, age, daysToBirthday) => {
	if (!birthday) return null
	const el = document.createElement('div')
	const birthdayDMY = formatDMY(birthday)
	el.innerHTML = `Age: ${age}<br />Birthday in ${daysToBirthday} days (${birthdayDMY})`
	return el
}

const renderSeen = (days) => {
	if (!days && days !== 0) return null
	const el = document.createElement('div')
	const button = document.createElement('button')
	el.innerHTML = `Seen before ${days} days`
	return el
}

const renderCustomTexts = (values) => {
	if (!values) return []
	return values.map(renderText)
}

const clearPersons = () => {
	const el = document.querySelector('.persons')
	if (!el) return
	el.innerHTML = ''
}

const renderAdd = (handleAdd) => {
	const el = document.createElement('div')
	const name = document.createElement('input')
	const [day, month, year] = birthdayPicker({day: 1, month: 1, year: 1980})
	const save = document.createElement('button')
	name.placeholder = 'Name'
	save.innerText = 'Save'
	save.addEventListener('click', () => {
		handleAdd(name.value, day.value, month.value, year.value)
	})
	el.appendChild(name)
	el.appendChild(day)
	el.appendChild(month)
	el.appendChild(year)
	el.appendChild(save)
	return el
}

export default function render (props: Object) {
	clearPersons() // TODO: clean when necessary
	if (props.persons.length) {
		return renderPersons(props.persons)
	} else {
		return renderEmpty()
	}
}
