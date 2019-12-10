const debug = require('debug')('electron-example:main');
const { app, session } = require('electron');

const createWindow = require('./src/create_window');

app.on('ready', async () => {
	debug('ready');
	const win1 = createWindow('view/index.html');
	const win2 = createWindow('view/index.html');
});