import {dispatch, getState} from '../store/store';
import {goToAdd} from '../router/router-actions';
import {DEFAULTS as DEFAULT_PERSON} from '../person/persons-model';
import {editPerson, toggleAdd} from '../person/person-actions';
import {ACTIONS as DATA_PROVIDER} from '../data-provider/actions';
import {isSyncOk} from '../data-provider/data-provider';
import {addTestAttribute, div} from '../utils/dom';
import ICONS from '../components/icons';
import './header.css';

export default function render () {
	const el = document.createElement('div');
	const spaceEl = document.createElement('div');
	spaceEl.classList.add('spaceEl');
	el.classList.add('app-header');
	addTestAttribute(el, 'header');
	const content = [
		renderTitle(),
		spaceEl,
		renderSync(),
		renderAdd(),
	];
	content.map((c) => el.appendChild(c));
	return el;
}

const renderTitle = () => {
	const el = document.createElement('h1');
	el.classList.add('header__title');
	el.innerHTML = 'Persons';
	return el;
};

const renderSync = () => {
	const classNames = ['header-button--sync'];
	let warn = null;
	if (!isSyncOk()) {
		classNames.push('header__sync-error');
		warn = div({className: 'header-button--warn', testId: `header-button--warn`}, ICONS.warn);
	}
	if (getState().isSyncing) {
		classNames.push('header__sync-inProgress');
	}
	const onClick = () => dispatch({type: DATA_PROVIDER.SYNC_CLICK});
	return (
		div({className: 'header__syncWrap'}, [
			div({className: classNames, testId: `header-button--sync`, onClick}, ICONS.sync),
			warn,
		])
	);
};

const renderAdd = () => {
	const el = document.createElement('div');
	el.classList.add('header-button--add');
	el.setAttribute('data-cy', 'header-button--add');
	el.addEventListener('click', () => {
		dispatch(editPerson(DEFAULT_PERSON));
		dispatch(toggleAdd(true));
	});
	el.innerHTML = ICONS.add;
	return el;
};
