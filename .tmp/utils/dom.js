/**
 *
 * @param {HTMLElement} element
 * @param {string} value
 */
export const addTestAttribute = (element, value) => {
    // @ts-ignore
    if (window && !window.Cypress)
        return;
    element.setAttribute('data-cy', value);
};
