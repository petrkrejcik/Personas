const APP_FOLDER = 'App-Personas'
let onSignInChangeHandler = Function
let onUpdateHandler = Function
let onErrorHandler = Function
let file = Object

const init = (options = {}) => {
	setupOptions(options)
	return new Promise ((resolve, reject) => {
		gapi.load('client:auth2', () => {
			initClient().then(resolve)
		})
	})
}

const setupOptions = ({onError, onSignInChange, onUpdate}) => {
	if (onSignInChange) onSignInChangeHandler = onSignInChange
	if (onUpdate) onUpdateHandler = onUpdate
	if (onError) onErrorHandler = onError
}

const initClient = () => {
	return new Promise ((resolve, reject) => {
		gapi.client.init({
			'apiKey': 'AIzaSyBYItpNT8k2Y2AEHz2E2kI2EqMULh5C4m0',
			'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
			'clientId': '614338309616-st9nui22tf3sa1cm9m1l3nd439n50frg.apps.googleusercontent.com',
			'scope': 'https://www.googleapis.com/auth/drive.file'
		})
		.then(() => {
			gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus)
			updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
			resolve({isInitiated: true})
		})
	})
}

const updateSignInStatus = (isLogged) => {
	onSignInChangeHandler(isLogged)
}

const connect = () => {
	if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
		fetchData()
	} else {
		gapi.auth2.getAuthInstance().signIn()
	}
}

const fetchData = () => {
	return getFolder()
	.then(findFile)
	.then((foundFile) => {
		file = foundFile
		return Promise.resolve()
	})
	.then(readFile)
}

const getFolder = () => {
	return new Promise ((resolve, reject) => {
		const request = gapi.client.drive.files.list({
			q: `name='${APP_FOLDER}' and trashed=false`,
		})

		request.execute((response) => {
			if (response.files.length === 0) {
				createFolder().then(resolve)
			} else {
				resolve(response.files[0].id)
			}
		})
	})
}

const createFolder = () => {
	return new Promise ((resolve, reject) => {
		const metadata = {
			name: APP_FOLDER,
			mimeType: 'application/vnd.google-apps.folder'
		}
		const request = gapi.client.drive.files.create({resource: metadata})
		request.execute((response) => {
			console.info('👉', 'created', response)
			resolve(response.id)
		})
	})
}

const findFile = (folderId) => {
	return new Promise ((resolve, reject) => {
		const request = gapi.client.drive.files.list({
			q: `name="persons.json" and '${folderId}' in parents`,
		})
		request.execute((response) => {
			if (response.files.length === 0) {
				// create file
				resolve(null)
			} else {
				resolve(response.files[0])
			}
		})
	})
}

const readFile = () => {
	return new Promise ((resolve, reject) => {
		const request = gapi.client.drive.files.get({
			fileId: file.id,
			alt: 'media'
		})
		request.execute((response) => {
			const r = response.result.map(result => {
				return {
					...result,
					name: unescape(result.name),
				}
			})
			resolve(r)
		})
	})
}

const updateContent = (content) => {
	const request = gapi.client.request({
		path: '/upload/drive/v2/files/' + file.id,
		method: 'PUT',
		alt: 'media',
		body: content,
	})
	request.execute((response) => {
		if (response.error) {
			onErrorHandler(`Error during sync: ${response.error.message}`)
			return
		}
		readFile().then(onUpdateHandler)
	})
}

export {
	connect,
	fetchData,
	init,
	updateContent,
}