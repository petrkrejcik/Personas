describe('Local storage', () => {
	it('shows stored items', () => {
		cy.get('[data-cy=person-foo-name]').should('not.be.visible')

		const person = {
			id: 'foo-name',
			name: 'Foo Name',
			birthday: '2000-12-02',
		}
		cy.addPerson(person)
		cy.get('[data-cy=person-foo-name]')
		cy.visit(Cypress.config().baseUrl)
		cy.get('[data-cy=person-foo-name]')
	})
})
