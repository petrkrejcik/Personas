# Personas

## Devstack
- [https://parceljs.org/getting_started.html](parcel.js)

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
[] Loader - overlay will disable entire page
[] CSS - Google Drive button - hide when connected; overlay with the button
[] CSS - make cards
[] Service worker - to work offline
[] Create empty `persons.json` if doesn't exist
