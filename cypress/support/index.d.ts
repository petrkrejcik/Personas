/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Adds person to store
     * @example cy.addPerson({})
    */
    addPerson(person: Object): Chainable<Element>
  }
}
