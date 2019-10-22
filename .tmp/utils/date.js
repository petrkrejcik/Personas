export const parseDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return { day, month, year };
};
export const createDate = (day, month, year) => {
    return new Date(year, month - 1, day);
    return `${year}-${month}-${day}`;
};
export const createIso = (day, month, year) => {
    const d = day.padStart(2, '0');
    const m = month.padStart(2, '0');
    return `${year}-${m}-${d}`;
};
export const formatDMY = (isoDate) => {
    const { day, month, year } = parseDate(isoDate);
    return `${day}. ${month}. ${year}`;
};
