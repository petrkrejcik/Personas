describe('Delete person', () => {
	it('cancel', () => {
		const person = {
			id: 'foo-name',
			name: 'Foo Name',
			birthday: '2000-12-02',
		}
		cy.addPerson(person)
		
		cy.get('[data-cy=person-foo-name] [data-cy=remove]').click({force: true})
		cy.get('[data-cy=person-foo-name] [data-cy=cancel]').click({force: true})
        
		cy.get('[data-cy=person-foo-name] [data-cy=remove-overlay]').should('not.be.visible')
		cy.get('[data-cy=person-foo-name]').should('be.visible')
	})
    
	it('removes', () => {
		const person = {
			id: 'foo-name',
			name: 'Foo Name',
			birthday: '2000-12-02',
		}
		cy.addPerson(person)
		
		cy.get('[data-cy=person-foo-name] [data-cy=remove]').click({force: true})
		cy.get('[data-cy=person-foo-name] [data-cy=confirm]').click()
		
		cy.get('[data-cy=person-foo-name]').should('not.be.visible')
	})
})
