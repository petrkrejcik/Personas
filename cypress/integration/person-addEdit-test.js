import {DEFAULTS as DEFAULT_PERSON} from '../../src/person/person-model';
import {createIso, formatDMY} from '../../src/utils/date';

describe('Add person', () => {
	it('opens dialog', () => {
		cy.get('[data-cy=header-button--add]').click();

		cy.get('[data-cy=add-input--name]').should('be.visible');
		cy.get('[data-cy=add-input--birthday]').should('be.visible');
		cy.get('[data-cy=add-button--save]').should('be.visible');
		// cy.url().should('include', '/add')
	});

	it('cancel button', () => {
		cy.get('[data-cy=header-button--add]').click();
		cy.get('[data-cy=add-button--cancel]').click();

		cy.get('[data-cy=add-input--name]').should('not.be.visible');
	});

	it('add new has default values', () => {
		cy.get('[data-cy=header-button--add]').click();

		cy.get('[data-cy=add-input--birthday] > select').eq(0).should('have.value', DEFAULT_PERSON.day);
		cy.get('[data-cy=add-input--birthday] > select').eq(1).should('have.value', DEFAULT_PERSON.month);
		cy.get('[data-cy=add-input--birthday] > select').eq(2).should('have.value', DEFAULT_PERSON.year);
	});

	it('adds new disabled without name', () => {
		cy.get('[data-cy=header-button--add]').click();

		cy.get('[data-cy=add-button--save]').click();
		cy.get('[data-cy=add-button--save]'); // Save button still visible
	});

	it('adds new disabled with only spaces in name', () => {
		cy.get('[data-cy=header-button--add]').click();
		cy.get('[data-cy=add-input--name]').type('  ');

		cy.get('[data-cy=add-button--save]').click();
		cy.get('[data-cy=add-button--save]'); // Save button still visible
	});

	it('adds new', () => {
		cy.get('[data-cy=header-button--add]').click();

		cy.get('[data-cy=add-input--name]').type('Foo Name');
		cy.get('[data-cy=add-input--birthday] > select').eq(0).select('2');
		cy.get('[data-cy=add-input--birthday] > select').eq(1).select('3');
		cy.get('[data-cy=add-input--birthday] > select').eq(2).select('1990');
		cy.get('[data-cy=add-button--save]').click();

		// cy.url().should('not.include', '/add')
		const date = formatDMY(createIso('2', '3', '1990'));
		cy.get('[data-cy|=person] [data-cy=title]').should('have.text', 'Foo Name');
		cy.get('[data-cy|=person] [data-cy=birthday]').should('contain.text', date);
		cy.get('[data-cy=add-button--save]').should('not.be.visible');
	});

	it('edit is prefilled', () => {
		const person = {
			id: 'foo-name',
			name: 'Foo Name',
			birthday: '2000-12-02',
		};
		cy.addPerson(person);

		cy.get('[data-cy=person-foo-name] [data-cy=edit]').click({force: true});

		// cy.url().should('include', '/foo-name')
		cy.get('[data-cy=add-input--name]').should('have.value', 'Foo Name');
		cy.get('[data-cy=add-input--birthday] > select').eq(0).should('have.value', '2');
		cy.get('[data-cy=add-input--birthday] > select').eq(1).should('have.value', '12');
		cy.get('[data-cy=add-input--birthday] > select').eq(2).should('have.value', '2000');
	});

	it('edit existing', () => {
		const person = {
			id: 'foo-name',
			name: 'Foo Name',
			birthday: '2000-12-02',
		};
		cy.addPerson(person);
		cy.get('[data-cy=person-foo-name] [data-cy=edit]').click({force: true});
		cy.get('[data-cy=add-input--name]').clear();
		cy.get('[data-cy=add-input--name]').type('Bar Name');
		cy.get('[data-cy=add-input--birthday] > select').eq(0).select('1');
		cy.get('[data-cy=add-input--birthday] > select').eq(1).select('2');
		cy.get('[data-cy=add-input--birthday] > select').eq(2).select('1990');
		cy.get('[data-cy=add-button--save]').click();

		const date = formatDMY(createIso('1', '2', '1990'));
		cy.get('[data-cy|=person] [data-cy=title]').should('have.text', 'Bar Name');
		cy.get('[data-cy|=person] [data-cy=birthday]').should('contain.text', date);
	});
});
