import {createId} from '../../src/person/person-util'

describe('Person util', () => {
	it('creates id', () => {
		const results = [
			['Foo', 'foo'],
			['Foo Bar', 'foo-bar'],
			[' Foo    Bar  ', 'foo-bar'],
		]
		results.forEach(([input, output]) => {
			expect(createId(input)).equal(output)
		})
	})
})


describe('DOM', () => {
	it('creates an element', () => {
		expect(1).equal(1);
	})
})
