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
 * @param {Object?} attrs
 * @param {string|Array<HTMLElement>?} children
 */
export const createDom = (tag, attrs = {}, children = []) => {
	const element = document.createElement(tag);
	const attachAttributeToEl = attachAttribute(element);
	Object.keys(attrs).map(key => attachAttributeToEl(key, attrs[key]));
	if (!Array.isArray(children)) children = [children];
	children.filter(Boolean).forEach(child => {
		if (typeof child === 'string') {
			if (child.trim()[0] === '<') {
				element.innerHTML = child; // Inject HTML into the element. Not ideal.
				return
			}
			child = document.createTextNode(child);
		}
		element.appendChild(child)
	});
	return element;
}

const attachAttribute = (element) => (key, value) => {
	switch (key) {
		case 'onClick': {
			element.addEventListener('click', value);
			break;
		}
		case 'className': {
			if (!Array.isArray(value)) value = [value];
			value.forEach(className => element.classList.add(className));
			break;
		}
		case 'testId': {
			addTestAttribute(element, value);
			break;
		}
		default: {
			element.setAttribute(key, value);
		}
	}
};

export const div = (...theArgs) => createDom('div', ...theArgs);
