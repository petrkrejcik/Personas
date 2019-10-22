import {dispatch, getState} from '/src/store/store.js'
import {birthdayPicker} from '/src/components/birthday-picker.js'
import {changeName} from '/src/person/person-actions.js'
import {storeActiveElement} from '/src/app/app-action.js'

export default function render () {
	const el = document.createElement('div')
	const content = [
		renderName(),
    renderPicker(),
		renderSave(),
	]
	content.map((c) => el.appendChild(c))
	return el
}

const renderName = () => {
  const el = document.createElement('input')
  el.placeholder = 'Name'
  el.classList.add('add-input--name')
	el.setAttribute('data-cy', 'add-input--name')
	el.setAttribute('data-prsKey', 'add-input--name')
  el.value = getState().personEditName
  el.addEventListener('input', (e) => {
    dispatch(storeActiveElement())
    dispatch(changeName(el.value))
  })
  // TODO: storeActiveElement na unfocus
	return el
}

const renderPicker = () => {
  const el = document.createElement('div')
  el.setAttribute('data-cy', 'add-input--birthday')
  const [day, month, year] = birthdayPicker({day: 1, month: 1, year: 1980})
  el.appendChild(day)
	el.appendChild(month)
	el.appendChild(year)
  return el
}

const renderSave = () => {
	const el = document.createElement('button')
  el.innerText = 'Save'
  el.addEventListener('click', () => {
		// handleAdd(name.value, day.value, month.value, year.value)
    console.log('saving');
	})
	el.classList.add('add-button--save')
	el.setAttribute('data-cy', 'add-button--save')
	return el
}
