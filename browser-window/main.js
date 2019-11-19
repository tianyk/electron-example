const debug = require('debug')('electron-example:main');
const path = require('path');
const { app, BrowserWindow } = require('electron');

const createWindow = require('./src/create_window');

app.on('ready', () => {
	const win = createWindow('view/index.html', {
		webPreferences: {
			// 先与网页脚本执行，运行环境在 BrowserWindow 中
			preload: path.join(__dirname, 'preload.js')
		}
	});
});