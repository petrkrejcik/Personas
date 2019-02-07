// import './google-drive.js'
import {fetchPersons} from './data-provider.js'

const renderPersons = (persons) => {
	const el = document.querySelector('.persons')
	const personsHtml = persons.map(renderPerson)
	personsHtml.forEach(person => el.appendChild(person))
}

const renderPerson = (fields) => {
	const el = document.createElement('div')
	fields.map(field => {
		switch (field.type) {
			case 'text': return renderText(field.value)
			case 'date': return renderDate(field.value)
			default: return null
		}
	})
	.filter(Boolean)
	.forEach(e => el.appendChild(e))
	return el
}

const renderText = (value) => {
	const el = document.createElement('div')
	el.innerHTML = value
	return el
}

const renderDate = (value) => {
	const now = Date.now()
	const date = new Date(value).getTime()
	const diff = new Date(now - date)
	const age = Math.abs(diff.getUTCFullYear() - 1970)
	const el = document.createElement('div')
	el.innerHTML = `${age} let. Narozeniny: ${value}`
	return el
}

const persons = fetchPersons()
renderPersons(persons)
