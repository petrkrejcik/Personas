const APP_FOLDER = 'App-Personas'

const init = () => {
	return new Promise ((resolve, reject) => {
		gapi.load('client:auth2', () => {
			initClient().then(resolve)
		})
	})
}

const initClient = () => {
	console.info('👉', 'init google client')
	return new Promise ((resolve, reject) => {
		gapi.client.init({
			'apiKey': 'AIzaSyBYItpNT8k2Y2AEHz2E2kI2EqMULh5C4m0',
			'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
			'clientId': '614338309616-st9nui22tf3sa1cm9m1l3nd439n50frg.apps.googleusercontent.com',
			'scope': 'https://www.googleapis.com/auth/drive.file'
		})
		.then(() => {
			gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
			if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
				console.info('👉', 'already logged')
				loadFiles().then(resolve)
			} else {
				resolve()
			}
		})
	})
}

const updateSigninStatus = (co) => {
	console.info('👉', 'logged?', gapi.auth2.getAuthInstance().currentUser.get())
}

const loadFiles = () => {
	return getFolder()
	.then(findFile)
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
		console.info('👉', 'creating')
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
		console.info('👉', 'folderId', folderId)
		const request = gapi.client.drive.files.list({
			q: `name="persons.json" and '${folderId}' in parents`,
		})
		request.execute((response) => {
			console.info('👉', 'find file response', response)
			if (response.files.length === 0) {
				// create file
				resolve(null)
			} else {
				resolve(response.files[0])
			}
		})
	})
}

const readFile = (file) => {
	return new Promise ((resolve, reject) => {
		const request = gapi.client.drive.files.get({
			fileId: file.id,
			alt: 'media'
		})
		request.execute((response) => {
			const r = response.result.map(result => {
				return {
					...result,
					name: decodeURIComponent(escape(result.name)),
				}
			})
			resolve(r)
		})
	})
}

const connect = () => {
	console.info('👉', 'connect')
	if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
		console.info('👉', 'already logged')
		gapi.auth2.getAuthInstance().currentUser.get()
		loadFiles()
	} else {
		console.info('👉', 'signign in...')
		gapi.auth2.getAuthInstance().signIn()
	}
}

export {
	connect,
	init,
}