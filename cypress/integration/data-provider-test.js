import dataProvider from '../../src/data-provider/data-provider';
import {dispatch, getState} from '../../src/store/store';
import {ACTIONS} from '../../src/app/app-action';

const waitMs = (ms) => async (cb) => {
	await new Promise(resolve => setTimeout(resolve, ms));
	cb();
};

const providerMock = (defaults = {}) => {
	const init = () => {};
	const get = () => defaults.stored || {};
	const set = () => {};
	const isLogged = () => defaults.isLogged || true;
	const isEnabled = () => defaults.isEnabled || true;

	return {
		init,
		get,
		set,
		isLogged,
		isEnabled,
	}
};

const stored1 = {
	persons: {
		'foo-name': {
			id: 'foo-name',
			name: 'Foo Name',
			birthday: '2000-12-02',
		},
	},
	updated: 10000000, // timestamp
};

const stored2 = {
	persons: {
		'bar-name': {
			id: 'bar-name',
			name: 'Bar Name',
			birthday: '2000-12-02',
		},
		'foo-name': {
			id: 'foo-name',
			name: 'Foo Name Updated',
			birthday: '2000-12-02',
		},
	},
	updated: 20000000,
};

const stored3 = {
	persons: {},
	updated: 30000000,
};

describe('Data provider', () => {
	it('load from empty', async () => {
		const p1 = providerMock();
		dataProvider([p1]);
		dispatch({type: ACTIONS.init});

		const wait1ms = waitMs(1);
		return await wait1ms(() => {
			expect(getState().persons).to.deep.equal({});
		})
	})

	it('load from one', async () => {
		const p1 = providerMock({stored: stored1});
		dataProvider([p1]);
		dispatch({type: ACTIONS.init});

		const wait1ms = waitMs(1);
		return await wait1ms(() => {
			expect(getState().persons).to.deep.equal(stored1.persons);
		})
	})

	it('synces with two', async () => {
		const p1 = providerMock({stored: stored1});
		const p2 = providerMock({stored: stored2});
		dataProvider([p1, p2]);
		dispatch({type: ACTIONS.init});

		const wait1ms = waitMs(1);
		return await wait1ms(() => {
			expect(getState().persons['foo-name'].name).to.equal('Foo Name Updated');
		})
	})

	it('synces with two vice versa', async () => {
		const p1 = providerMock({stored: stored1});
		const p2 = providerMock({stored: stored2});
		dataProvider([p2, p1]);
		dispatch({type: ACTIONS.init});

		const wait1ms = waitMs(1);
		return await wait1ms(() => {
			expect(getState().persons['foo-name'].name).to.equal('Foo Name Updated');
		})
	})
	it('does not remove', async () => {
		const p1 = providerMock({stored: stored1});
		const p2 = providerMock({stored: stored2});
		const p3 = providerMock({stored: stored3});
		dataProvider([p1, p2, p3]);
		dispatch({type: ACTIONS.init});

		const wait1ms = waitMs(1);
		return await wait1ms(() => {
			expect(getState().persons['foo-name'].name).to.equal('Foo Name Updated');
		})
	})
})
