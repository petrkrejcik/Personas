var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dispatch, getState, subscribe } from '../store/store';
import { ACTIONS } from '../data-provider/actions';
import { ACTIONS as PERSON } from '../person/person-actions';
const GDRIVE = 'gdrive';
const getSelectedStorage = () => {
    return GDRIVE;
};
export function setup(dataProviderFactory) {
    const dataProvider = dataProviderFactory({
        onReady: () => dispatch(PERSON.FETCH),
    });
    subscribe((action) => __awaiter(this, void 0, void 0, function* () {
        switch (action.type) {
            case PERSON.SYNC: {
                const persons = dataProvider.save(getState().persons);
                console.info('👉', 'persons synced', persons);
                break;
            }
            case PERSON.FETCH: {
                const persons = yield dataProvider.fetch();
                dispatch({ type: PERSON.SET, payload: persons });
                break;
            }
            case ACTIONS.LIB_LOADED: {
                dataProvider.onLibLoaded();
                break;
            }
            case ACTIONS.LOGIN: {
                dataProvider.login();
                break;
            }
        }
    }));
}
export function fetchLib() {
    return __awaiter(this, void 0, void 0, function* () {
        const storageType = getSelectedStorage();
        if (storageType === GDRIVE) {
            const response = yield fetch('https://apis.google.com/js/api.js');
            eval(yield response.text());
            dispatch({ type: ACTIONS.LIB_LOADED });
        }
    });
}
