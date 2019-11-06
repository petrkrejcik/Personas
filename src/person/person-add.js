// @ts-check
import {dispatch, getState} from '../store/store'
import {birthdayPicker} from '../components/birthday-picker'
import {editField} from '../person/person-actions'
import {storeActiveElement} from '../app/app-action'
import {addTestAttribute} from '../utils/dom'

/**
 * @param {{onSave: Function}} props 
 */
export default function render (props) {
	const el = document.createElement('div')
	const {personEdit} = getState()
	if (!personEdit) throw new Error('Empty `personEdit')
	const content = [
		renderName(personEdit.name),
		renderPicker(personEdit.day, personEdit.month, personEdit.year),
		renderSaveButton(personEdit, props.onSave),
	]
	content.map((c) => el.appendChild(c))
	return el
}

const renderName = (name) => {
	const el = document.createElement('input')
	el.placeholder = 'Name'
	el.classList.add('add-input--name')
	addTestAttribute(el, 'add-input--name')
	el.setAttribute('data-prsKey', 'add-input--name')
	el.value = name
	el.addEventListener('input', e => {
		dispatch(storeActiveElement())
		dispatch(editField('name', el.value))
	})
	// TODO: storeActiveElement na unfocus
	return el
}

const renderPicker = (day, month, year) => {
	const el = document.createElement('div')
	el.setAttribute('data-cy', 'add-input--birthday')
	const [dayEl, monthEl, yearEl] = birthdayPicker({day, month, year}, (field, value) => {
		dispatch(editField(field, value))
	})
	el.appendChild(dayEl)
	el.appendChild(monthEl)
	el.appendChild(yearEl)
	return el
}

const renderSaveButton = (personEdit, onSave) => {
	const el = document.createElement('button')
	el.innerText = 'Save'
	el.addEventListener('click', () => onSave())
	el.classList.add('add-button--save')
	el.setAttribute('data-cy', 'add-button--save')
	return el
}
