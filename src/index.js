import {addListener} from './state.js'
import {libLoaded as googleLibLoaded, setup as googleSetup} from './google-model.js'
import {clearPersons, renderPersons} from './persons-view.js'

const setup = () => {
	googleSetup()
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

