window.gapi = {
    load: (foo, cb) => {
        console.info('👉', 'loaded mock');
        cb();
    },
    client: {
        init: () => Promise.resolve(),
        request: () => ({
            execute: () => Promise.resolve()
        }),
        drive: {
            files: {
                list: () => ({
                    execute: () => Promise.resolve(),
                }),
                get: () => ({
                    execute: () => Promise.resolve(),
                }),
            },
        },
    },
    auth2: {
        getAuthInstance: () => ({
            isSignedIn: {
                listen: () => { },
                get: () => { },
            },
            signIn: () => { },
        })
    }
};
