const debug = require('debug')('electron-example:main');
require('./src/protocol');
const { app } = require('electron');

const createWindow = require('./src/create_window');

process.on('uncaughtException', (err) => {
	debug('[uncaughtException]', err);
});

app.on('ready', async () => {
	debug('ready');
	createWindow('view/index.html', { show: true });
});