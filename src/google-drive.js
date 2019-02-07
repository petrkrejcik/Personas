googleDriveLoaded = () => {
	gapi.load('client:auth2', initClient)
}

initClient = () => {
	console.info('👉', 'init')
	gapi.client.init({
		'apiKey': 'AIzaSyBz6kaw8hv33obv4U4L88r1MgjeX99XgTo',
		'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
		'clientId': '614338309616-st9nui22tf3sa1cm9m1l3nd439n50frg.apps.googleusercontent.com',
		'scope': 'https://www.googleapis.com/auth/drive.file'
	}).then(() => {
		console.info('👉', 'get instance')
		GoogleAuth = gapi.auth2.getAuthInstance()
		GoogleAuth.isSignedIn.listen(updateSigninStatus);
		if (GoogleAuth.isSignedIn.get()) {
			console.info('👉', 'already logged')
			loadFiles()
		}
	})
}

updateSigninStatus = (co) => {
	console.info('👉', 'updateSigninStatus', co)
	// console.info('👉', 'logged as', GoogleAuth.currentUser.get())
}

connectGoogleDrive = () => {
	// GoogleAuth.currentUser.get()
	GoogleAuth.signIn()
}

loadFiles = () => {
	// files = resource
	// post = method
	const metadata = {
		//id 1eBA6K5-p6F54mFbf4hWaFpMEnmdiBQhJ
		name: 'Apps',
		mimeType: 'application/vnd.google-apps.folder'
		// mimeType: 'application/vnd.google-apps.file'
	}
	// const request = gapi.client.drive.files.create({resource: metadata})
	const request = gapi.client.drive.files.list()

	request.execute((response) => {
	  console.log('mam to', response)
	})
}