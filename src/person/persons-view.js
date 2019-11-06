// @ts-check
import ICONS from '../components/icons'
import {formatDMY} from '../utils/date'
import {addTestAttribute} from '../utils/dom'
import { getState } from "../store/store"
import renderAddEdit from './person-add'
import './person.css'

/**
 * Render
 * @param {{persons: Array<Person>, isAdd: boolean, onSave: Function}} props Propperties
 */
export default function render (props) {
	clearPersons() // TODO: clean when necessary
	const el = document.createElement('div')
	el.classList.add('persons')
	addTestAttribute(el, 'persons')
	if (props.isAdd) {
		el.appendChild(renderAddEdit({onSave: props.onSave}))
	} else if (props.persons.length === 0) {
		el.appendChild(renderEmpty())
	}
	renderPersons(props.persons)
		.forEach(person => el.appendChild(person))
	return el
}

/**
 * Renders element with persons.
 * @param {Array<Person>} persons Persons
 */
const renderPersons = (persons) => {
	return persons.map(renderPerson)
}

const renderPerson = person => {
	const {deleteOverlayId, personEdit} = getState()
	if (personEdit && personEdit.id === person.id) return renderEditOverlay(person)
	if (deleteOverlayId === person.id) return renderRemoveOverlay(person)
	
	const el = createPersonEl(person)
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
	edit.addEventListener('click', person.onEditClick.bind(null, person.id))
	remove.addEventListener('click', person.onRemoveClick.bind(null, person.id))
	addTestAttribute(edit, 'edit')
	addTestAttribute(remove, 'remove')
	edit.classList.add('icon-edit', 'icon')
	remove.classList.add('icon-remove', 'icon')
	edit.innerHTML = ICONS.edit
	remove.innerHTML = ICONS.remove
	el.appendChild(remove)
	el.appendChild(edit)
	return el
}

const renderEmpty = () => {
	const el = document.createElement('div')
	el.classList.add('personsEmpty')
	addTestAttribute(el, 'personsEmpty')
	el.innerText = 'No persons created yet.'
	return el
}

const renderRemoveOverlay = person => {
	const el = createPersonEl(person)
	const overlay = document.createElement('div')
	const confirm = document.createElement('div')
	addTestAttribute(overlay, 'remove-overlay')
	const cancel = document.createElement('div')
	confirm.addEventListener('click', (ev) => person.remove(person.id))
	cancel.addEventListener('click', person.cancelRemove.bind(null, null))
	addTestAttribute(confirm, 'confirm')
	addTestAttribute(cancel, 'cancel')
	confirm.innerHTML = 'Confirm'
	cancel.innerHTML = 'Cancel'
	overlay.appendChild(confirm)
	overlay.appendChild(cancel)
	el.appendChild(overlay)
	return el
}

const renderEditOverlay = person => {
	return renderAddEdit({onSave: person.save})
}

const createPersonEl = person => {
	const el = document.createElement('div')
	el.classList.add('person')
	addTestAttribute(el, `person-${person.id}`)
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
