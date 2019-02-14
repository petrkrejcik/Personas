const renderPersons = (persons) => {
	const el = document.querySelector('.persons')
	const personsHtml = persons.map(renderPerson)
	personsHtml.forEach(person => el.appendChild(person))
}

const renderPerson = (person) => {
	const el = document.createElement('div')
	el.classList.add('person')
	const fields = [
		renderText(person.name),
		renderBirthday(person.birthday),
		// renderSeen(person.seen),
		...renderCustomTexts(person.customTexts),
	]
	fields
	.filter(Boolean)
	.forEach(field => el.appendChild(field))
	return el
}

const renderText = (value) => {
	const el = document.createElement('div')
	el.innerHTML = value
	return el
}

const renderBirthday = (value) => {
	const getRemainingDays = () => {
		const birthday = new Date(value)
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
	const now = Date.now()
	const date = new Date(value).getTime()
	const diff = new Date(now - date)
	const age = Math.abs(diff.getUTCFullYear() - 1970)
	const el = document.createElement('div')
	el.innerHTML = `Age: ${age}.<br />Birthday in ${getRemainingDays()} days (${value}).`
	return el
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
