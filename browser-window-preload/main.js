const debug = require('debug')('electron-example:main');
const { app } = require('electron');
const path = require('path');

const createWindow = require('./src/create_window');

app.on('ready', () => {
	const win = createWindow('view/index.html', {
		// 禁用最大最小化
		minimizable: false,
		maximizable: false,
		webPreferences: {
			devTools: true,
			nodeIntegration: false,
			preload: path.join(__dirname, 'src/preload.js')
		}
	});
});