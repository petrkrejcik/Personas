export const birthdayPicker = ({day, month, year}, onChange) => {
	const createOptions = (start, end, selected) => {
		const options = Array.from({length: end + 1 - start}, (v, k) => start + k) 
		return options.map(i => {
			const option = document.createElement('option')
			const value = i + ''
			option.innerText = value
			option.value = value
			if (selected && value === selected) option.selected = true
			return option
		})
	}

	const dayEl = document.createElement('select')
	const monthEl = document.createElement('select')
	const yearEl = document.createElement('select')
	createOptions(1, 31, day).forEach(option => dayEl.appendChild(option))
	createOptions(1, 12, month).forEach(option => monthEl.appendChild(option))
	createOptions(1900, 2019, year).forEach(option => yearEl.appendChild(option))
	
	/**
	 * @param {HTMLInputElement} type 
	 */
	const onChangeCb = (type) => (ev) => onChange(type, (ev.target).value)
	
	dayEl.addEventListener('change', onChangeCb('day'))
	monthEl.addEventListener('change', onChangeCb('month'))
	yearEl.addEventListener('change', onChangeCb('year'))

	return [dayEl, monthEl, yearEl]
}
