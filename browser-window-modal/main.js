const debug = require('debug')('electron-example:main');
const path = require('path');
const { app } = require('electron');

const createWindow = require('./src/create_window');

app.on('ready', () => {
	const win = createWindow('view/index.html', {
		webPreferences: {
			devTools: false
		}
	});
});