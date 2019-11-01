// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const browserify = require('@cypress/browserify-preprocessor')
const path = require('path')
const pathmodify = require('pathmodify');

const stripSlash = data => {
	const absolutePath = __dirname.slice(0, 8)
	if (data.id && data.id[0] === '/' && !data.id.startsWith(absolutePath)) {
		return {
			id: data.id.slice(1)
		}
	}
	return data
}

module.exports = (on, config) => {
	// `on` is used to hook into various events Cypress emits
	// `config` is the resolved Cypress config
	const options = browserify.defaultOptions
	options.browserifyOptions.plugin = options.browserifyOptions.plugin || [];
	options.browserifyOptions.plugin.unshift([
		pathmodify, { mods: [stripSlash]},
	]);

	options.browserifyOptions.paths = [
		path.resolve(__dirname + '/../../src/'),
	]

	on('file:preprocessor', browserify(options))
}
