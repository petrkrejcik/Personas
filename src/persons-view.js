import {getState, setState} from './state.js'

const renderPersons = (persons, handleAdd) => {
	const el = document.querySelector('.persons')
	persons
		.map(renderPerson)
		.forEach(person => el.appendChild(person))
	el.appendChild(renderAdd(handleAdd))
}

const renderPerson = (person, index) => {
	const el = document.createElement('div')
	el.classList.add('person')
	const fields = [
		renderTitle(person.name),
		renderBirthday(person.birthday, person.age, person.daysToBirthday),
		renderSeen(person.seenBefore, index, person.resetSeen),
		...renderCustomTexts(person.customTexts),
	]
	fields
	.filter(Boolean)
	.forEach(field => el.appendChild(field))
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
	el.innerHTML = `Age: ${age}<br />Birthday in ${daysToBirthday} days (${birthday})`
	return el
}

const renderSeen = (days, personIndex, handleReset) => {
	if (!days) return null
	const el = document.createElement('div')
	const button = document.createElement('button')
	button.classList.add('buttonSeen')
	button.innerText = 'Today'
	button.addEventListener('click', handleReset.bind(null, personIndex))
	el.innerHTML = `Seen before ${days} days`
	el.appendChild(button)
	return el
}

const renderCustomTexts = (values) => {
	if (!values) return []
	return values.map(renderText)
}

const clearPersons = () => {
	const el = document.querySelector('.persons')
	el.innerHTML = ''
}

const renderAdd = (handleAdd) => {
	const el = document.createElement('div')
	const name = document.createElement('input')
	const birthday = document.createElement('input')
	const save = document.createElement('button')
	name.placeholder = 'Name'
	birthday.placeholder = 'Birthday (YYYY-MM-DD)'
	save.innerHTML = 'Save'
	save.addEventListener('click', () => {
		handleAdd(name.value, birthday.value)
	})
	el.appendChild(name)
	el.appendChild(birthday)
	el.appendChild(save)
	return el
}

export {clearPersons, renderPersons}
