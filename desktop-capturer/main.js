const debug = require('debug')('electron-example:main');
require('./src/protocol');

const { app, ipcMain, BrowserWindow } = require('electron');
const createWindow = require('./src/create_window');

let mainWindow;

process.on('uncaughtException', (err) => {
	debug('[uncaughtException]', err);
});

ipcMain.on('select-window', (evt, options) => {
	debug('[select-window]', options);
	const dialogWindow = createWindow('./view/select_window.html', {
		width: 600,
		height: 400,
		show: false,
		parent: mainWindow,
		modal: true,
		resizable: false,
		// 禁用最大最小化
		minimizable: false,
		maximizable: false,
		// frame 创建一个无标题栏和窗口控制按钮的窗口
		frame: false
	});

	dialogWindow.webContents.on('did-finish-load', () => {
		// 刷新后可用
		dialogWindow.webContents.send('get-sources', options);
		dialogWindow.show();
	});
});

ipcMain.on('source-id-selected', (evt, sourceId) => {
	debug(['source-id-selected'], sourceId);
	const win = BrowserWindow.fromWebContents(evt.sender);
	win.close();
	mainWindow.webContents.send('source-id-selected', sourceId);
	mainWindow.hide();
});

app.on('ready', async () => {
	debug('ready');
	mainWindow = createWindow('view/index.html', { show: true });
});
