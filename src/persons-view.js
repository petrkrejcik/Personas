const renderPersons = (persons) => {
	const el = document.querySelector('.persons')
	persons
		.sort(sortByBirthday)
		.map(renderPerson)
		.forEach(person => el.appendChild(person))
}

const sortByBirthday = (personA, personB) => {
	if (!personA.birthday || !personB.birthday) return 0
	return getDaysToBirthday(personA.birthday) - getDaysToBirthday(personB.birthday)
}

const renderPerson = (person) => {
	const el = document.createElement('div')
	el.classList.add('person')
	const fields = [
		renderTitle(person.name),
		renderBirthday(person.birthday),
		// renderSeen(person.seen),
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

const renderBirthday = (value) => {
	if (!value) return null
	const now = Date.now()
	const date = new Date(value).getTime()
	const diff = new Date(now - date)
	const age = Math.abs(diff.getUTCFullYear() - 1970)
	const el = document.createElement('div')
	el.innerHTML = `Age: ${age}<br />Birthday in ${getDaysToBirthday(value)} days (${value})`
	return el
}

const getDaysToBirthday = (isoDate) => {
	if (!isoDate) return null
	const birthday = new Date(isoDate)
	const nowYear = new Date().getUTCFullYear()
	const diff = Date.now() - new Date(`${nowYear}-${birthday.getMonth() + 1}-${birthday.getDate()}`).getTime()
	let days
	if (diff < 0) {
		// this year
		days = Math.abs(Math.ceil(diff / 1000 / 60 / 60 / 24))
	} else {
		// next year
		const diffNext = Date.now() - new Date(`${nowYear + 1}-${birthday.getMonth() + 1}-${birthday.getDate()}`).getTime()
		days = Math.abs(Math.ceil(diffNext / 1000 / 60 / 60 / 24))
	}
	return days
}

const renderSeen = (value) => {
	const reset = () => {
		console.info('👉', 'resettings')
	}
	const now = Date.now()
	const date = new Date(value).getTime()
	const days = Math.round((now - date) / 1000 / 60 / 60/ 24)
	const el = document.createElement('div')
	const button = document.createElement('button')
	button.innerText = 'Dnes'
	button.addEventListener('click', reset)
	el.innerHTML = `Viděli jsme se před: ${days} dny.`
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

export {clearPersons, renderPersons}
