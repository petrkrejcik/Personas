import {subscribe} from '/src/store/store.js'
import {setState} from '/src/store/store.js'
import {editPerson, resetSeen} from '/src/person/persons-model.js'
import {parseDate} from '/src/utils/date.js'
import {birthdayPicker} from '/src/components/birthday-picker.js'

const ELEMENTS = {
	overlay: {
		selector: 'div[data-prs="overlay"]',
		show: 'flex',
	},
	loader: {
		selector: 'div[data-prs="loader"]',
		show: 'block',
	},
	singIn: {
		selector: 'button[data-prs="googleDriveButton"]',
		show: 'block',
	},
	edit: {
		selector: 'div[data-prs="edit"]',
		show: 'block',
	},
}

const update = () => {
	showElement(ELEMENTS.loader, state.view === 'loading')
	showElement(ELEMENTS.singIn, state.view === 'signIn')
	showElement(ELEMENTS.edit, state.view === 'edit')
	showElement(ELEMENTS.overlay, ['loading', 'edit', 'signIn'].includes(state.view))
	if (state.view === 'edit' && state.editingPerson) {
		renderEdit(state.persons.find(({id}) => id === state.editingPerson))
	}
}

const renderEdit = (person) => {
	const el = document.querySelector(ELEMENTS.edit.selector)
	el.innerHTML = ''
	const name = document.createElement('input')
	const [day, month, year] = birthdayPicker(parseDate(person.birthday))
	const save = document.createElement('button')
	const seen = document.createElement('button')
	const cancel = document.createElement('button')
	seen.classList.add('seen-save')
	save.classList.add('edit-save')
	save.innerText = 'Save'
	seen.innerText = 'Seen today'
	cancel.innerText = 'Cancel'
	name.value = person.name
	save.addEventListener('click', () => {
		editPerson(person.id, name.value, day.value, month.value, year.value)
	})
	seen.addEventListener('click', () => {
		resetSeen(person.id)
	})
	cancel.addEventListener('click', () => {
		setState({view: 'persons', editingPerson: null})
	})
	el.appendChild(name)
	el.appendChild(day)
	el.appendChild(month)
	el.appendChild(year)
	el.appendChild(seen)
	el.appendChild(save)
	el.appendChild(cancel)
}

const showElement = (element, show) => {
	const el = document.querySelector(element.selector)
	el.style['display'] = show ? element.show : 'none'
}

export const setup = () => {
	// subscribe(update)
}
