export const ACTIONS = {
	LIB_LOADED: 'data-provider/lib-loaded',
	SYNC_CLICK: 'data-provider/sync-click', // on click
	SYNC_START: 'data-provider/sync-start',
	SYNC_END: 'data-provider/sync-end',
	LOGIN: 'data-provider/login',
	SET: 'data-provider/set', // sets providers in store
}

export const syncStart = () => ({type: ACTIONS.SYNC_START});
export const syncEnd = () => ({type: ACTIONS.SYNC_END});
export const setProviders = (providers) => ({type: ACTIONS.SET, payload: providers});
