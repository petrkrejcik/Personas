import {createId} from '/person/person-util.js'

describe.only('Person util', () => {
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
