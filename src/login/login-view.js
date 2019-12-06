import {createDom, div} from '../utils/dom';
import {ACTIONS as DATA_PROVIDER} from '../data-provider/actions';
import {dispatch} from '../store/store';

export default function render () {
	const onClick = () => dispatch({type: DATA_PROVIDER.LOGIN});
	const login = createDom('button', {onClick});
	login.innerText = 'Login'
	return (
		div({}, login)
	);
}
