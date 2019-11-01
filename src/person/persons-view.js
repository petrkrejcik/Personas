import {birthdayPicker} from '/components/birthday-picker.js'
import ICONS from '/components/icons.js'
import {formatDMY} from '/utils/date.js'
import {addTestAttribute} from '/utils/dom'

const renderPersons = (persons) => {
	const el = document.createElement('div')
	el.classList.add('persons')
	el.setAttribute('data-cy', 'persons')
	persons
		.map(renderPerson)
		.forEach(person => el.appendChild(person))
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
	addTestAttribute(el, `person-${person.id}`)
	const fields = [
		renderTitle(person.name),
		renderBirthday(person),
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
	edit.addEventListener('click', person.onEditClick.bind(null, person.id))
	remove.addEventListener('click', person.handleRemove.bind(null, person.id))
	addTestAttribute(edit, 'edit')
	addTestAttribute(remove, 'remove')
	edit.innerHTML = ICONS.edit
	remove.innerHTML = ICONS.remove
	el.appendChild(remove)
	el.appendChild(edit)
	return el
}

const renderTitle = (value) => {
	const el = renderText(value)
	el.classList.add('person-title')
	addTestAttribute(el, 'title')
	return el
}

const renderText = (value) => {
	const el = document.createElement('div')
	el.innerHTML = value
	return el
}

const renderBirthday = ({birthday, age, daysToBirthday}) => {
	if (!birthday) return null
	const el = document.createElement('div')
	addTestAttribute(el, 'birthday')
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

export default function render (props) {
	clearPersons() // TODO: clean when necessary
	if (props.persons.length) {
		return renderPersons(props.persons)
	} 
	return renderEmpty()
	
}
