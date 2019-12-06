/**
 * @typedef {Object} PersonModelProps
 * @property {Array<PersonProps>} persons
 * @property {boolean} isAdd
 * @property {Function} onSave
 * @property {Function} onCancel
 */

/**
 * @typedef {Object} PersonProps extends Person
 * @property {number} age
 * @property {number} daysToBirthday
 * @property {number} seenBefore
 * @property {Function} onEditClick
 * @property {Function} onRemoveClick
 * @property {Function} cancelRemove
 * @property {Function} remove
 * @property {Function} save
 */
