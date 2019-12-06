/**
 * @typedef {Object} DataProvider
 * @property {() => void} init
 * @property {() => Promise<{persons?: Object, updated?: number}>} get
 * @property {(data: Object) => void} set
 * @property {() => void=} login
 * @property {() => boolean} isLogged
 * @property {() => boolean} isEnabled
 */
