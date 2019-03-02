import {addListener} from './state.js'
import {libLoaded as googleLibLoaded, setup as setupGoogleDrive} from './google-drive-model.js'
import {clearPersons, renderPersons} from './persons-view.js'
import {setup as setupOverlay} from './overlay.js'

const setup = () => {
	setupGoogleDrive()
	setupOverlay()
	addListener(update)
}

const update = (state) => {
	updatePersons(state.persons)
}

const updatePersons = (persons) => {
	clearPersons()
	renderPersons(persons)
}

export {
	googleLibLoaded,
	setup,
}

