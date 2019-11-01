import {DEFAULTS as DEFAULT_PERSON} from '/person/persons-model.js'
import {createIso, formatDMY} from '/utils/date.js'

describe('Add person', () => {
	it('opens dialog', () => {
		cy.get('[data-cy=header-button--add]').click()

		cy.get('[data-cy=add-input--name]').should('be.visible')
		cy.get('[data-cy=add-input--birthday]').should('be.visible')
		cy.get('[data-cy=add-button--save]').should('be.visible')
		cy.url().should('include', '/add')
	})

	it('add new has default values', () => {
		cy.get('[data-cy=header-button--add]').click()

		cy.get('[data-cy=add-input--birthday] > select').eq(0).should('have.value', DEFAULT_PERSON.day)
		cy.get('[data-cy=add-input--birthday] > select').eq(1).should('have.value', DEFAULT_PERSON.month)
		cy.get('[data-cy=add-input--birthday] > select').eq(2).should('have.value', DEFAULT_PERSON.year)
	})

	it('adds new', () => {
		cy.get('[data-cy=header-button--add]').click()

		cy.get('[data-cy=add-input--name]').type('Foo Name')
		cy.get('[data-cy=add-input--birthday] > select').eq(0).select('2')
		cy.get('[data-cy=add-input--birthday] > select').eq(1).select('3')
		cy.get('[data-cy=add-input--birthday] > select').eq(2).select('1990')
		cy.get('[data-cy=add-button--save]').click()

		cy.url().should('not.include', '/add')
		const date = formatDMY(createIso('2', '3', '1990'))
		cy.get('[data-cy|=person] [data-cy=title]').should('have.text', 'Foo Name')
		cy.get('[data-cy|=person] [data-cy=birthday]').should('contain.text', date)
		cy.get('[data-cy=add-button--save]').should('not.be.visible')
	})

	it('edit is prefilled', () => {
		const person = {
			id: 'foo-name',
			name: 'Foo Name',
			birthday: '2000-12-02',
		}
		cy.addPerson(person)

		// cy.get('[data-cy=header-button--add]').click()

		// cy.get('[data-cy=add-input--name]').type('Foo Name')
		// cy.get('[data-cy=add-input--birthday] > select').eq(0).select('2')
		// cy.get('[data-cy=add-input--birthday] > select').eq(1).select('12')
		// cy.get('[data-cy=add-input--birthday] > select').eq(2).select('2000')
		// cy.get('[data-cy=add-button--save]').click()


		cy.get('[data-cy=person-foo-name] [data-cy=edit]').click()

		cy.url().should('include', '/foo-name')
		cy.get('[data-cy=add-input--name]').should('have.value', 'Foo Name')
		cy.get('[data-cy=add-input--birthday] > select').eq(0).should('have.value', '2')
		cy.get('[data-cy=add-input--birthday] > select').eq(1).should('have.value', '12')
		cy.get('[data-cy=add-input--birthday] > select').eq(2).should('have.value', '2000')
	})

	it('edit existing', () => {
		const person = {
			id: 'foo-name',
			name: 'Foo Name',
			birthday: '2000-12-02',
		}
		cy.addPerson(person)
		cy.get('[data-cy=person-foo-name] [data-cy=edit]').click()
		cy.get('[data-cy=add-input--name]').clear()
		cy.get('[data-cy=add-input--name]').type('Bar Name')
		cy.get('[data-cy=add-input--birthday] > select').eq(0).select('1')
		cy.get('[data-cy=add-input--birthday] > select').eq(1).select('2')
		cy.get('[data-cy=add-input--birthday] > select').eq(2).select('1990')
		cy.get('[data-cy=add-button--save]').click()

		const date = formatDMY(createIso('1', '2', '1990'))
		cy.get('[data-cy|=person] [data-cy=title]').should('have.text', 'Bar Name')
		cy.get('[data-cy|=person] [data-cy=birthday]').should('contain.text', date)
	})
})
