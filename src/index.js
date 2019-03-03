import {libLoaded as googleLibLoaded, setup as setupGoogleDrive} from './google-drive-model.js'
import {setup as setupPersonModel} from './persons-model.js'
import {setup as setupOverlay} from './overlay.js'

const setup = () => {
	setupGoogleDrive()
	setupOverlay()
	setupPersonModel()
}

export {
	googleLibLoaded,
	setup,
}

