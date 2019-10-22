import {dispatch, getState} from '/src/store/store.js'
import {birthdayPicker} from '/src/components/birthday-picker.js'
import {save} from '/src/person/person-actions.js'
import {edit} from '/src/person/person-actions.js'
import {storeActiveElement} from '/src/app/app-action.js'
import {goToHome} from '/src/router/router-actions.js'

export default function render () {
	const el = document.createElement('div')
	const person = getState().personEdit
	const content = [
		renderName(person.name),
		renderPicker(person.day, person.month, person.year),
		renderSave(person),
	]
	content.map((c) => el.appendChild(c))
	return el
}

const renderName = (name) => {
	const el = document.createElement('input')
	el.placeholder = 'Name'
	el.classList.add('add-input--name')
	el.setAttribute('data-cy', 'add-input--name')
	el.setAttribute('data-prsKey', 'add-input--name')
	el.value = name
	el.addEventListener('input', (e) => {
		dispatch(storeActiveElement())
		dispatch(edit('name', el.value))
	})
	// TODO: storeActiveElement na unfocus
	return el
}

const renderPicker = (day, month, year) => {
	const el = document.createElement('div')
	el.setAttribute('data-cy', 'add-input--birthday')
	const [dayEl, monthEl, yearEl] = birthdayPicker({day, month, year}, (field, value) => {
		dispatch(edit(field, value))
	})
	el.appendChild(dayEl)
	el.appendChild(monthEl)
	el.appendChild(yearEl)
	return el
}

const renderSave = (person) => {
	const el = document.createElement('button')
	el.innerText = 'Save'
	el.addEventListener('click', () => {
		const id = Math.random().toString(36).substring(10)
		dispatch(save({id, ...person}))
		dispatch(goToHome())
	})
	el.classList.add('add-button--save')
	el.setAttribute('data-cy', 'add-button--save')
	return el
}
