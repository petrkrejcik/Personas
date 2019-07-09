# Personas

## Devstack
- [https://parceljs.org/getting_started.html](parcel.js)
- Vanilla JS

## Install
```sh
npm i
```

## Run
```sh
npm start
```

- Open [http://localhost:1234]()
- Turn off adBlock

## Build
```sh
npm run build
```
- Will build app into `/docs` folder with publish URL set to `/personas`.
- Just commit this dir on GitHub and it will work on https://petrkrejcik.github.io/personas

#### Google Drive API Console
[Google Console](https://console.developers.google.com/apis/credentials?project=personas-220021&folder&organizationId)

##### API
[API reference](https://developers.google.com/drive/api/v2/reference)

`gapi.auth2.getAuthInstance().signIn()`

`gapi.auth2.getAuthInstance().signOut()`

`gapi.auth2.getAuthInstance().isSignedIn.get()`

[Search parameters](https://developers.google.com/drive/api/v3/search-parameters)

## TODO
- [ ] Style `Add new`
- [ ] Service worker - to work offline: cache google libs; cache persons
  - problem with hash in the filename
- [ ] Better error messages (e.g. after unsuccessful sync)
- [ ] Top bar
- [ ] Remove obsolete JS and CSS files after build
- [ ] Share persons - open URL with persons in query
- [ ] Back button on mobile closes the app (create a router)
- [ ] Pressing `Seen today` should not directly save but rather remember click and save on `Save` button
- [ ] Credits
	`<div>Icons made by <a href="https://www.flaticon.com/authors/gregor-cresnar" title="Gregor Cresnar">Gregor Cresnar</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>`
- [ ] Loader

## Icons
https://www.flaticon.com/packs/multimedia-collection