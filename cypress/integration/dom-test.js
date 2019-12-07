import {createDom, div} from '../../src/utils/dom';

describe('createDom', () => {
	it('creates an element', () => {
		const e = createDom('div');
		expect(e.outerHTML).equal('<div></div>');
	});
	it('creates a children', () => {
		const child = createDom('div');
		const e = createDom('div', {}, [child]);
		expect(e.outerHTML).equal('<div><div></div></div>');
	});
	it('dont render falsy child', () => {
		const e = createDom('div', {}, [null, false]);
		expect(e.outerHTML).equal('<div></div>');
	});
	it('creates a text child', () => {
		const e = createDom('div', {}, ['childText']);
		expect(e.outerHTML).equal('<div>childText</div>');
		const e2 = createDom('div', {}, 'childText');
		expect(e2.outerHTML).equal('<div>childText</div>');
	});
	it('creates an element with attributes', () => {
		const e = createDom('div', {title: 'fooTitle', name: 'fooName'});
		expect(e.outerHTML).equal('<div title="fooTitle" name="fooName"></div>');
	});
	it('creates an element with class', () => {
		const e = createDom('div', {className: 'fooClass'});
		expect(e.outerHTML).equal('<div class="fooClass"></div>');
		const e2 = createDom('div', {className: ['fooClass', 'barClass']});
		expect(e2.outerHTML).equal('<div class="fooClass barClass"></div>');
	});
	it('creates a child with attributes', () => {
		const child = createDom('div', {name: 'fooName'});
		const e = createDom('div', {title: 'fooTitle'}, [child]);
		expect(e.outerHTML).equal('<div title="fooTitle"><div name="fooName"></div></div>');
	});
	it('creates a div', () => {
		const e = div({name: 'fooName'}, ['bar']);
		expect(e.outerHTML).equal('<div name="fooName">bar</div>');
	});
});
