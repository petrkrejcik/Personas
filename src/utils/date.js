// @ts-check

/**
 * Parses `2001-12-31` to separate values
 * @param {string} isoDate
 * @returns {{day: string, month: string, year: string}} object with day, month, year
 */
export const parseDate = (isoDate) => {
	const date = new Date(isoDate)
	const day = date.getDate() + ''
	const month = date.getMonth() + 1 + ''
	const year = date.getFullYear() + ''
	return {day, month, year}
}

export const createDate = (day, month, year) => new Date(year, month - 1, day)

export const createIso = (day, month, year) => {
	const d = day.padStart(2, '0')
	const m = month.padStart(2, '0')
	return `${year}-${m}-${d}`
}

export const formatDMY = (isoDate) => {
	const {day, month, year} = parseDate(isoDate)
	return `${day}. ${month}. ${year}`
}

export const getNow = () => {
	const date = new Date();
	return [date.getDate(), date.getMonth() + 1];
};

/**
 * Returns number of days before birthday
 * @param {Array<number>} fromDate [day, month]
 * @param {Array<number>} toDate [day, month]
 * @returns {number}
 */
export const diffDays = (fromDate, toDate) => {
	const createDate = (year, day, month) => new Date([year, month, day].join('-'));
	if (!fromDate) return null
	const [fromDay, fromMonth] = fromDate;
	const [toDay, toMonth] = toDate;
	const isToAfter = fromMonth <= toMonth && fromDay <=toDay;
	const fromYear = '2000'; // prestupny rok?
	const toYear = isToAfter ? '2000' : '2001';
	const from = createDate(fromYear, fromDay, fromMonth);
	const to = createDate(toYear, toDay, toMonth);
	const diff = to.getTime() - from.getTime();
	return Math.ceil(diff / 1000 / 60 / 60 / 24);
}
