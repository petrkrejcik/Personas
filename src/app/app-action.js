import {getState} from '/store/store.js'

export const ACTIONS = {
  setActiveElement: 'utils/set-active-element',
}

export const storeActiveElement = () => {
	const el = document.activeElement
	if (!el) return {type: ''}
	const key = el.getAttribute('data-prsKey')
  if (!key) return {type: ''}
	return {
    type: ACTIONS.setActiveElement,
    payload: key,
  }
}

export const getActiveElement = () => {
  const key = getState().activeElement
  if (!key) return null
  const el = document.querySelector(`[data-prsKey=${key}]`)
  return el
}
