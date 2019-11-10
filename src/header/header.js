import {dispatch, getState} from '../store/store'
import {goToAdd} from '../router/router-actions'
import {DEFAULTS as DEFAULT_PERSON} from '../person/persons-model'
import {editPerson, toggleAdd} from '../person/person-actions'
import { addTestAttribute } from '../utils/dom'
import ICONS from '../components/icons'
import './header.css'

export default function render () {
	const el = document.createElement('div')
	el.classList.add('app-header')
	addTestAttribute(el, 'header')
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
	el.innerHTML = ICONS.sync
	return el
}

const renderAdd = () => {
	const el = document.createElement('div')
	el.classList.add('header-button--add')
	el.setAttribute('data-cy', 'header-button--add')
	el.addEventListener('click', () => {
		dispatch(editPerson(DEFAULT_PERSON))
		dispatch(toggleAdd(true))
	})
	el.innerHTML = ICONS.add
	return el
}
