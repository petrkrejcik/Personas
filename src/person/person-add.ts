import {dispatch, getState} from '/store/store.js'
import {birthdayPicker} from '/components/birthday-picker.js'
import {save, editField} from '/person/person-actions.js'
import {storeActiveElement} from '/app/app-action.js'
import {goToHome} from '/router/router-actions.js'
import {createIso} from '/utils/date.js'
import {createId} from '/person/person-util.js'
import {addTestAttribute} from '/utils/dom'

export default function render () {
	const el = document.createElement('div')
	const {personEdit} = getState()
	const content = [
		renderName(personEdit.name),
		renderPicker(personEdit.day, personEdit.month, personEdit.year),
		renderSaveButton(personEdit),
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

const renderSaveButton = (personEdit) => {
	const el = document.createElement('button')
	el.innerText = 'Save'
	el.addEventListener('click', () => {
		// TODO: Move to separate function
		const {day, month, year, ...personRest} = personEdit
		const person = {
			id: createId(personRest.name),
			...personRest,
			birthday: createIso(day, month, year),
		}
		dispatch(save(person))
		dispatch(goToHome())
	})
	el.classList.add('add-button--save')
	el.setAttribute('data-cy', 'add-button--save')
	return el
}
