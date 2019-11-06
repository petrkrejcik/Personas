// @ts-check
/**
 * 
 * @param {HTMLElement} element 
 * @param {string} value 
 */
export const addTestAttribute = (element, value) => {
	// @ts-ignore
	if (window && !window.Cypress) return
	element.setAttribute('data-cy', value)
}

/**
 * Creates a DOM structure of elements.
 * 
 * @param {string} tag Type of trag (div, img)
 * @param {Object} props 
 * @param {Array<HTMLElement>} children 
 */
export const createDom = (tag, props, children) => {
	return []
}