const debug = require('debug')('electron-example:main');
const { app } = require('electron');

const createWindow = require('./src/create_window');

app.on('ready', async () => {
	debug('ready');
	const mainWin = createWindow(`view/index.html`);

	mainWin.webContents.on('will-navigate', (evt, url) => {
		debug('will-navigate', url);
	});

	// 打开新窗口事件
	mainWin.webContents.on('new-window', (evt, url, frameName, disposition, options) => {
		debug('new-window url: %s, frameName: %s, disposition: %j, options: %j', url, frameName, disposition, options);
		// 阻止默认行为
		evt.preventDefault();

		const win = createWindow(url, options);
		if (!win.show) win.once('ready-to-show', () => win.show());
		win.loadURL(url);

		// 必须用event.newGuest来引用BrowserWindow实例
		evt.newGuest = win;
	});
});