const APP_FOLDER = 'App-Personas'
const FILE_NAME = 'persons.json'
let onSignInChangeHandler = Function
let onUpdateHandler = Function
let onErrorHandler = Function
let fileId = Object
let folderId = Object
let defaultContent = null

const init = (options = {}) => {
	setupOptions(options)
	return new Promise ((resolve, reject) => {
		gapi.load('client:auth2', () => {
			initClient().then(resolve)
		})
	})
}

const setupOptions = ({defaultContent: defaultContentOption, onError, onSignInChange, onUpdate}) => {
	if (onSignInChange) onSignInChangeHandler = onSignInChange
	if (onUpdate) onUpdateHandler = onUpdate
	if (onError) onErrorHandler = onError
	if (defaultContentOption) defaultContent = defaultContentOption
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
	.then(getFile)
	.then(getFileContent)
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
				folderId = response.files[0].id
				resolve()
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
			folderId = response.id
			resolve()
		})
	})
}

const getFile = () => {
	return new Promise ((resolve, reject) => {
		const request = gapi.client.drive.files.list({
			q: `name="${FILE_NAME}" and '${folderId}' in parents and trashed=false`,
		})
		request.execute((response) => {
			if (response.files.length === 0) {
				createFile().then(resolve)
			} else {
				fileId = response.files[0].id
				resolve()
			}
		})
	})
}
const createFile = () => {
	return new Promise ((resolve, reject) => {
		const boundary = '-------314159265358979323846'
		const delimiter = "\r\n--" + boundary + "\r\n"
		const close_delim = "\r\n--" + boundary + "--"

		const contentType = 'application/json'

		const metadata = {
			name: FILE_NAME,
			mimeType: contentType,
			parents: [folderId],
		}

		const multipartRequestBody =
			delimiter +
			'Content-Type: application/json\r\n\r\n' +
			JSON.stringify(metadata) +
			delimiter +
			'Content-Type: ' + contentType + '\r\n\r\n' +
			(defaultContent ? JSON.stringify(defaultContent) : '') +
			close_delim

		const request = gapi.client.request({
			'path': '/upload/drive/v3/files',
			'method': 'POST',
			'params': {'uploadType': 'multipart'},
			'headers': {
			  'Content-Type': 'multipart/related; boundary="' + boundary + '"'
			},
			'body': multipartRequestBody
		})

		request.execute((response) => {
			fileId = response.id
			resolve()
		})
	})
}

const getFileContent = () => {
	return new Promise ((resolve, reject) => {
		const request = gapi.client.drive.files.get({
			fileId: fileId,
			alt: 'media',
		})
		request.execute((response) => {
			if (response.error) {
				onErrorHandler(`Error during file download: ${response.error.message}`)
				return
			}
			resolve(response.result)
		})
	})
}

const updateContent = (content) => {
	return new Promise ((resolve, reject) => {
		const request = gapi.client.request({
			path: '/upload/drive/v2/files/' + fileId,
			method: 'PUT',
			alt: 'media',
			body: content,
		})
		request.execute((response) => {
			if (response.error) {
				onErrorHandler(`Error during sync: ${response.error.message}`)
				return
			}
			getFileContent().then((fileContent) => {
				onUpdateHandler(fileContent)
				resolve(fileContent)
			})
		})
	})
}

export {
	connect,
	fetchData,
	init,
	updateContent,
}