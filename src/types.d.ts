export {};
declare global {
    interface Window {
        Cypress: Object;
        getState: () => Object;
        store: Object;
    }
}
