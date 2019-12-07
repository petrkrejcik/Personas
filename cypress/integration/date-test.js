import {diffDays} from '../../src/utils/date';

describe('diffDays', () => {
	it('returns days', () => {
		const results = [
			[[1, 1], [1, 1], [0]],
			[[1, 1], [2, 1], [1]],
			[[1, 1], [3, 1], [2]],
			[[1, 1], [1, 2], [31]],
			[[31, 12], [1, 1], [1]],
			[[2, 1], [1, 1], [365]],
		];
		results.forEach(([fromDate, toDate, [output]]) => {
			expect(diffDays(fromDate, toDate)).equal(output);
		});
	});
});
