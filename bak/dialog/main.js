const debug = require('debug')('electron-example:main');
const { app } = require('electron');

const createWindow = require('./src/create_window');

app.on('ready', () => {
	debug('ready');
	const mainWindow = createWindow('view/index.html');
});