export const birthdayPicker = ({day, month, year}) => {
	const createOptions = (start, end, selected) => {
		return [...Array(end + 1).keys()].slice(start).map(i => {
			const option = document.createElement('option')
			option.innerText = i
			option.value = i
			if (selected && i === selected) option.selected = true
			return option
		})
	}

	const dayEl = document.createElement('select')
	const monthEl = document.createElement('select')
	const yearEl = document.createElement('select')
	const dayOptions = createOptions(1, 31, day).forEach(option => dayEl.appendChild(option))
	const monthOptions = createOptions(1, 12, month).forEach(option => monthEl.appendChild(option))
	const yearOptions = createOptions(1900, 2019, year).forEach(option => yearEl.appendChild(option))
	return [dayEl, monthEl, yearEl]
}
