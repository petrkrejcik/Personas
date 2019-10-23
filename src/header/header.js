import {dispatch, getState} from '/store/store.js'
import {goToAdd} from '/router/router-actions.js'

export default function render () {
	const el = document.createElement('div')
	el.setAttribute('data-cy', 'header')
	const content = [
		renderTitle(),
		renderSync(),
		renderAdd(),
	]
	content.map((c) => el.appendChild(c))
	return el
}

const renderTitle = () => {
	const el = document.createElement('div')
	el.innerHTML = 'Persons'
	return el
}

const renderSync = () => {
	const el = document.createElement('div')
	el.classList.add('header-button--sync')
	el.setAttribute('data-cy', 'header-button--sync')
	el.innerHTML = 'Sync'
	return el
}

const renderAdd = () => {
	const el = document.createElement('div')
	el.classList.add('header-button--add')
	el.setAttribute('data-cy', 'header-button--add')
	el.addEventListener('click', () => dispatch(goToAdd()))
	el.innerHTML = 'Add'
	return el
}
