describe('Main', () => {
	it('header & loading is visible', () => {
		cy.get('[data-cy=header]').should('be.visible')
		cy.get('[data-cy=loader]').should('not.be.visible')
	})

	it('persons are not visible because user is not logged', () => {
		cy.get('[data-cy=loader]').should('not.be.visible')
		cy.get('[data-cy|=person]').should('not.be.visible')
		cy.get('[data-cy|=personsEmpty]').should('be.visible')
	})

	xit('deletes persons', () => {
		cy.get('[data-cy|=person]').its('length').then(originalLength => {
			cy.get('[data-cy|=person]').first().find('[data-cy=remove]').click()
			cy.get('[data-cy|=person]').should('have.length', originalLength - 1)
		})
	})
})
