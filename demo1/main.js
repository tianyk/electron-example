const debug = require('debug')('electron-example:main');
const { app, BrowserWindow } = require('electron');

const createWindow = require('./src/create_window');

app.on('ready', () => {
	const win = createWindow('view/index.html');
});