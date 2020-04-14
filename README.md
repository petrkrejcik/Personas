# Personas

## Devstack

- Vanilla JS

## Run

```sh
npm i
npm start
```

- Open [http://localhost:1234]()

## Build

```sh
npm run build
```

- Will build app into `/docs` folder with publish URL set to `/Personas`.
- Just commit this dir on GitHub and it will work on https://petrkrejcik.github.io/Personas

## How it works

- Router creates components to display based on URL.
- Components are divided into two layers - model and view.
- Component model takes data from state and converts them to props for view.

## Dependencies

- [ParcelJS](https://parceljs.org/getting_started.html)
- Google Drive API library

#### Google Drive API Console

[Google Console](https://console.developers.google.com/apis/credentials?project=personas-220021&folder&organizationId)

##### API

[API reference](https://developers.google.com/drive/api/v2/reference)

`gapi.auth2.getAuthInstance().signIn()`

`gapi.auth2.getAuthInstance().signOut()`

`gapi.auth2.getAuthInstance().isSignedIn.get()`

[Search parameters](https://developers.google.com/drive/api/v3/search-parameters)

## Sync Flow

1. Load app
1. Load data from data providers (localStorage, GDrive)
1. Save to local state
1. Add/Edit/Delete person in app
1. Save to state
1. Save to localStorage
1. Save to Google Drive

## TODO

- [ ] Center edit icon vertically
- [ ] Sometimes Google throws error when syncing
- [ ] CSS: Add/Edit person
- [ ] Service worker - to work offline: cache google libs; cache persons
  - problem with hash in the filename
- [ ] Better error messages (e.g. after unsuccessful sync)
- [ ] Back button on mobile closes the app (create a router)
- [ ] Pressing `Seen today` should not directly save but rather remember click and save on `Save` button
- [ ] Loader
- [ ] Share persons - open URL with persons in query

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
