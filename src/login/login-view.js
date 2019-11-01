export default function render (props) {
	const login = document.createElement('button')
	login.innerText = 'Login'
	login.addEventListener('click', () => {
		props.handleLoginClick()
	})
	const wrap = document.createElement('div')
	wrap.appendChild(login)
	return wrap
}
