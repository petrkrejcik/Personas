/// <reference path="types.d.ts" />
// import dataProvider from './data-provider/google-drive/google-drive-model'
import { fetchLib } from './data-provider/data-provider';
import * as store from './store/store';
import { setup as setupRouter } from './router/router';
const setup = () => {
    fetchLib();
    // setupDataProvider(dataProvider)
    // setupOverlay()
    setupRouter();
};
window.getState = store.getState; // TODO: for debug only
if (window.Cypress) {
    // For Cypress testing library
    window.store = store;
}
export { setup, };
