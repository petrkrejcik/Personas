/// <reference path="./person-types.d.ts" />

import ICONS from '../components/icons'
import {formatDMY} from '../utils/date'
import {addTestAttribute, div, createDom} from '../utils/dom'
import { getState } from "../store/store"
import renderAddEdit from './person-add-edit-view'
import './person.css'

/**
 * Render
 * @param {PersonModelProps} props Properties
 */
export default function render (props) {
	clearPersons() // TODO: clean when necessary
	const el = document.createElement('div')
	el.classList.add('persons')
	addTestAttribute(el, 'persons')
	if (props.isAdd) {
		el.appendChild(renderAddEdit({onSave: props.onSave, onCancel: props.onCancel}))
	} else if (props.persons.length === 0) {
		el.classList.add('empty');
		el.appendChild(renderEmpty())
	}
	props.persons
		.map(renderPerson(props.onCancel))
		.forEach(person => el.appendChild(person))
	return el
}

/**
 * Renders element with person.
 * @param {Function} onCancel
 * @returns {(PersonProps) => HTMLElement}
 */
const renderPerson = onCancel => person => {
	const {deleteOverlayId, personEdit} = getState()
	if (deleteOverlayId === person.id) return renderRemoveOverlay(person)
	if (personEdit && personEdit.id === person.id) return renderEditOverlay(person, onCancel)

	const onEditClick = person.onEditClick.bind(null, person.id);
	const onRemoveClick = person.onRemoveClick.bind(null, person.id);
	return (
		div({className: 'person', testId: `person-${person.id}`}, [
			div({className: ['person__column', 'person__column-grow']}, [
				renderTitle(person.name),
				renderBirthday(person),
				renderSeen(person.seenBefore),
				...renderCustomTexts(person.customTexts),
			]),
			div({className: 'person__column'}, [
				div({className: ['icon-edit', 'icon'], testId: 'edit', onClick: onEditClick}, ICONS.edit),
			]),
		])
	);
}

const renderEmpty = () => {
	return div({className: 'personsEmpty', testId: 'personsEmpty'}, ['No persons created yet.'])
}

const renderRemoveOverlay = person => {
	console.log('🔊', 'renderRemoveOverlay')
	const onConfirmClick = ev => person.remove(person.id);
	const onCancelClick = person.cancelRemove.bind(null, null);
	return (
		div({className: 'person', testId: `person-${person.id}`}, [
			div({className: 'person__removeOverlay', testId: 'remove-overlay'}, [
				createDom('button', {
					className: ['person__button', 'person__button--warning'],
					onClick: onConfirmClick,
				}, 'Remove'),
				createDom('button', {
					className: ['person__button'],
					onClick: onCancelClick,
				}, 'Cancel'),
			]),
		])
	);
}

const renderEditOverlay = (person, onCancel) => {
	const onRemove = person.onRemoveClick.bind(null, person.id);
	return renderAddEdit({onSave: person.save, onCancel, onRemove})
}

const createPersonEl = person => {
	return div({className: 'person', testId: `person-${person.id}`});
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
	let text = `Age: ${age}<br />Birthday in ${daysToBirthday} days (${birthdayDMY})`;
	if (daysToBirthday === 1) {
		text = `Tomorrow is the ${age + 1}'s birthday`;
	}
	if (daysToBirthday === 0) {
		text = `🎉 Today is celebrating ${age} years 🎊`;
	}
	el.innerHTML = text;
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
