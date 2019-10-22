// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

let polyfill

// grab fetch polyfill from remote URL, could be also from a local package
before(() => {
  console.log('before');
  const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js'
  cy.request(polyfillUrl)
  .then((response) => {
    polyfill = response.body
  })
})

beforeEach(() => {
  console.log('beforeEach');
  cy.server()
  const gapi = cy.readFile('cypress/fixtures/gapi.js')
  .then((gapi) => {
    cy.route('https://apis.google.com/js/api.js', gapi)
  })
  cy.visit('http://localhost:1234/', {
    onBeforeLoad (win) {
      delete win.fetch
      win.eval(polyfill)
      win.fetch = win.unfetch
    }
  })
})
