describe('Add person', () => {
	it('opens dialog', () => {
		cy.get('[data-cy=header-button--add]').click()

		cy.get('[data-cy=add-input--name]').should('be.visible')
		cy.get('[data-cy=add-input--birthday]').should('be.visible')
		cy.get('[data-cy=add-button--save]').should('be.visible')
		cy.url().should('include', '/add')
	})

	it('adds news', () => {
		cy.get('[data-cy=header-button--add]').click()

		cy.get('[data-cy=add-input--name]').type('foo')
		cy.get('[data-cy=add-input--birthday] > select').eq(0).select('2')
		cy.get('[data-cy=add-input--birthday] > select').eq(1).select('3')
		cy.get('[data-cy=add-input--birthday] > select').eq(2).select('1990')
		cy.get('[data-cy=add-button--save]').click()

		cy.get('[data-cy=person]').should('be.visible')

	})
})
