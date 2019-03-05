import {addListener} from './state.js'
import {setState} from './state.js'
import {editPerson, resetSeen} from './persons-model.js'

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

const update = (state) => {
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
	const birthday = document.createElement('input')
	const save = document.createElement('button')
	const seen = document.createElement('button')
	const cancel = document.createElement('button')
	save.innerText = 'Save'
	seen.innerText = 'Seen today'
	cancel.innerText = 'Cancel'
	name.value = person.name
	birthday.value = person.birthday
	save.addEventListener('click', () => {
		editPerson(person.id, name.value, birthday.value)
	})
	seen.addEventListener('click', () => {
		resetSeen(person.id)
	})
	cancel.addEventListener('click', () => {
		setState({view: 'persons', editingPerson: null})
	})
	el.appendChild(name)
	el.appendChild(birthday)
	el.appendChild(save)
	el.appendChild(seen)
	el.appendChild(cancel)
}

const showElement = (element, show) => {
	const el = document.querySelector(element.selector)
	el.style['display'] = show ? element.show : 'none'
}

export const setup = () => {
	addListener(update)
}
