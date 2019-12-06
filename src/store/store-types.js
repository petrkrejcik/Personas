/**
 * @typedef {Object} State
 * @property {{[key: string]: Person}} persons
 * @property {PersonEdit=} personEdit
 * @property {Element=} activeElement
 * @property {string=} deleteOverlayId
 * @property {Array<import("../data-provider/data-provider-types").DataProvider>=} dataProviders
 * @property {boolean=} isAddingPerson
 * @property {boolean=} isSyncing
 */

/**
 * @typedef {Object} Person
 * @property {string} id
 * @property {string} name
 * @property {string} birthday
 * @property {string=} seen
 */

/**
 * @typedef {Object} PersonEdit
 * @property {string} id
 * @property {string} name
 * @property {string} day
 * @property {string} month
 * @property {string} year
 */

/**
 * @typedef {Object} Action
 * @property {string} type
 * @property {any=} payload
 */
