import {addListener} from './state.js'

const ELEMENTS = {
	overlay: {
		selector: 'div[data-prs="overlay"]',
		show: 'flex',
	},
	loader: {
		selector: 'div[data-prs="loader"]',
		show: 'block',
	},
	singIn: {
		selector: 'button[data-prs="googleDriveButton"]',
		show: 'block',
	},
}

const update = (state) => {
	showElement(ELEMENTS.loader, state.isLoading)
	showElement(ELEMENTS.singIn, !state.isSignedIn)
	showElement(ELEMENTS.overlay, state.isLoading || !state.isSignedIn)
}

const showElement = (element, show) => {
	const el = document.querySelector(element.selector)
	el.style['display'] = show ? element.show : 'none'
}

export const setup = () => {
	addListener(update)
}
