const renderPersons = (persons, handleAdd) => {
	const el = document.querySelector('.persons')
	persons
		.map(renderPerson)
		.forEach(person => el.appendChild(person))
	el.appendChild(renderAdd(handleAdd))
}

const renderPerson = (person) => {
	const el = document.createElement('div')
	el.classList.add('person')
	const fields = [
		renderTitle(person.name),
		renderBirthday(person.birthday, person.age, person.daysToBirthday),
		renderSeen(person.seenBefore),
		...renderCustomTexts(person.customTexts),
	]
	fields
	.filter(Boolean)
	.forEach(field => el.appendChild(field))
	const actions = document.createElement('div')
	const edit = document.createElement('button')
	const remove = document.createElement('button')
	edit.innerText = 'Edit'
	remove.innerText = 'Remove'
	edit.addEventListener('click', person.handleEdit.bind(null, person.id))
	remove.addEventListener('click', person.handleRemove.bind(null, person.id))
	actions.appendChild(edit)
	actions.appendChild(remove)
	el.appendChild(actions)
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
	el.innerHTML = ''
}

const renderAdd = (handleAdd) => {
	const el = document.createElement('div')
	const name = document.createElement('input')
	const birthday = document.createElement('input')
	const save = document.createElement('button')
	name.placeholder = 'Name'
	birthday.placeholder = 'Birthday (YYYY-MM-DD)'
	save.innerText = 'Save'
	save.addEventListener('click', () => {
		handleAdd(name.value, birthday.value)
	})
	el.appendChild(name)
	el.appendChild(birthday)
	el.appendChild(save)
	return el
}

export {clearPersons, renderPersons}
