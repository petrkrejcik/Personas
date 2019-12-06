import {dispatch, getState} from '../store/store'
import {birthdayPicker} from '../components/birthday-picker'
import {editField, remove} from './person-actions'
import {storeActiveElement} from '../app/app-action'
import {addTestAttribute, div, createDom} from '../utils/dom';

/**
 * @param {{onSave: Function, onCancel: Function, onRemove: Function}} props
 */
export default function render (props) {
	const el = document.createElement('div')
	el.classList.add('person')
	const {personEdit} = getState()
	if (!personEdit) throw new Error('Empty `personEdit')
	const content = [
		div({className: ['person__column', 'person__column-grow']}, [
			renderName(personEdit.name),
			renderPicker(personEdit.day, personEdit.month, personEdit.year),
		]),
		div({className: 'person__column'}, [
			renderSaveButton(personEdit, props.onSave),
			div({className: 'person__secondaryButtons'}, [
				renderRemoveButton(props.onRemove),
				renderCancelButton(props.onCancel),
			]),
		]),
	]
	content.map((c) => el.appendChild(c))
	return el
}

const renderName = (name) => {
	const el = document.createElement('input')
	el.placeholder = 'Name'
	el.classList.add('person__input')
	addTestAttribute(el, 'add-input--name')
	el.setAttribute('data-prsKey', 'add-input--name')
	el.value = name
	el.addEventListener('input', e => {
		dispatch(storeActiveElement())
		dispatch(editField('name', el.value))
	})
	// TODO: storeActiveElement na unfocus
	return el
}

const renderPicker = (day, month, year) => {
	const el = document.createElement('div')
	el.setAttribute('data-cy', 'add-input--birthday')
	el.classList.add('person__input')
	const [dayEl, monthEl, yearEl] = birthdayPicker({day, month, year}, (field, value) => {
		dispatch(editField(field, value))
	})
	el.appendChild(dayEl)
	el.appendChild(monthEl)
	el.appendChild(yearEl)
	return el
}

const renderSaveButton = (personEdit, onSave) => {
	return createDom('button', {
		className: ['person__button', 'person__button--primary'],
		onClick: onSave,
		testId: 'add-button--save',
	}, 'OK');
}

const renderCancelButton = (onCancel) => {
	return createDom('span', {
		className: ['button', 'person__button--secondary'],
		onClick: onCancel,
		testId: 'add-button--cancel',
	}, 'Cancel');
}

const renderRemoveButton = (onRemove) => {
	return createDom('span', {
		className: ['button', 'person__button--secondary', 'warning'],
		onClick: onRemove,
	}, 'Remove');
};
