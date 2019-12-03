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

## How it works
- Router creates components to display based on URL.
- Components are divided into two layers - model and view.
- Component model takes data from state and converts them to props for view.

#### Google Drive API Console
[Google Console](https://console.developers.google.com/apis/credentials?project=personas-220021&folder&organizationId)

##### API
[API reference](https://developers.google.com/drive/api/v2/reference)

`gapi.auth2.getAuthInstance().signIn()`

`gapi.auth2.getAuthInstance().signOut()`

`gapi.auth2.getAuthInstance().isSignedIn.get()`

[Search parameters](https://developers.google.com/drive/api/v3/search-parameters)

## Flow
1. Response from server with HTML containing loading state
1. Lookup in local storage for used storage (GDrive/local/none)
1. (if storage selected) Fetch library for working with current storage
1. (if storage selected) Fetch data from the storage
1. Show data or empty screen

## Sync Flow
1. Load app
1. Load data from data providers (localStorage, GDrive)
1. When there are more than 1 provider:
1a. Merge data together
- mam data ulozeny na GDrive
- zapnu appku na novym devicu
- appka je prazdna
- vytvorim tam personu
- dam sync s GDrive
- cely GDrive se smaze, protoze localStorage je novejsi

1. Save to state

1. Add/Edit/Delete person in app
1. Save to state
1. Save to (overwrite) localStorage
1. Save to Google Drive

## TODO
- [ ] Sometimes Google throws error when syncing
- [x] Sync when removing a person
- [ ] Create good ID
- [x] Sync with Google Drive
- [x] Sync all providers between each other
- [x] Make localStorage just another provider
- [x] `Cancel` button when adding
- [x] CSS: Responsive layout
- [x] CSS: Header
- [ ] CSS: Add/Edit person
- [x] CSS: Persons remove overlay with buttons
- [x] Store state locally
- [x] Add new data provider
  - `resetSeen` calls `dispatch`. This method should be used instead of `updateContent`. When I get rid of it, `data-provider` will be the only one who will managed the connection to API/local database
- [ ] Service worker - to work offline: cache google libs; cache persons
  - problem with hash in the filename
- [ ] Better error messages (e.g. after unsuccessful sync)
- [ ] Top bar
- [ ] Remove obsolete JS and CSS files after build
- [ ] Share persons - open URL with persons in query
- [ ] Back button on mobile closes the app (create a router)
- [ ] Pressing `Seen today` should not directly save but rather remember click and save on `Save` button
- [ ] Loader

## Icons
https://material.io/resources/icons/?style=baseline

## UI for PWA
https://onsen.io/

## Limits
- Person's name has to be unique.

## Vanilla.js challenges
- Routing
- Rendering and updating of components
- Removing `data-cy` attributes from elements

## Decisions
### Do not use absolute paths
- It's a non-standard and only Parcel.js understands that by default. 
- Problem with Typescript - cannot find modules.
- Problem when Cypress imports file. Has to be hacked:
```
const pathmodify = require('pathmodify')

const stripSlash = data => {
	const absolutePath = __dirname.slice(0, 8)
	if (data.id && data.id[0] === '/' && !data.id.startsWith(absolutePath)) {
		return {
			id: data.id.slice(1)
		}
	}
	return data
}

const options = browserify.defaultOptions
options.browserifyOptions.plugin = options.browserifyOptions.plugin || [];
options.browserifyOptions.plugin.unshift([
	pathmodify, { mods: [stripSlash]},
]);
```

### Use Typescript
- IDE support worth it.

### Use ESlint
- To keep the code consistent.

### Unit tests
- They have to be located in `cypress` folder because Cypress wasn't able to run the test when they were located in `src`. I have specified that in `cypress.json` using `testFiles` property.
- They can't be run in watch mode in CLI. I have to run them in a browser like intergration test. (`only` doesn't work in headless mode)
