const debug = require('debug')('electron-example:main');
require('./src/protocol');
const { app } = require('electron');

const createWindow = require('./src/create_window');

app.on('ready', async () => {
	debug('ready');
	createWindow('view/index.html', { show: true });
});