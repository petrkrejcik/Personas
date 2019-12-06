export const createId = (name) => {
    return name
        .trim()
        .toLowerCase()
        .split(' ')
        .filter(Boolean)
        .join('-');
};
