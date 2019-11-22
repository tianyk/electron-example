const debug = require('debug')('electron-example:main');
const minimatch = require('minimatch');
const { app } = require('electron');

const domainWhiteList = require('./src/domain_white_list');
const createWindow = require('./src/create_window');

app.on('ready', async () => {
	debug('ready');
	const mainWin = createWindow('view/index.html');


	// dom元素准备好以后
	mainWin.webContents.on('dom-ready', (evt) => {
		debug('[dom-ready]', evt.sender.getURL());
	});

	// 网页加载完成 load 后
	mainWin.webContents.on('did-finish-load', (evt) => {
		debug('[did-finish-load]', evt.sender.getURL());
	});

	// 页面崩溃后
	mainWin.webContents.on('crashed', (evt) => {
		debug('[crashed]', evt.sender.getURL());
	});

	// 渲染进程发送 ipc 消息时
	mainWin.webContents.on('ipc-message', (evt, channel, args) => {
		debug('[ipc-message] [channel] %s, %j', channel, evt.sender.getURL(), args);
	});

	mainWin.webContents.on('will-navigate', (evt, url) => {
		debug('[will-navigate]', url);
		if (!domainWhiteList.match(url)) evt.preventDefault();
	});

	// 打开新窗口事件
	mainWin.webContents.on('new-window', (evt, url, frameName, disposition, options) => {
		debug('[new-window] url: %s, frameName: %s, disposition: %j, options: %j', url, frameName, disposition, options);
		// 阻止默认行为
		evt.preventDefault();

		const win = createWindow(url, options);
		if (!win.show) win.once('ready-to-show', () => win.show());
		win.loadURL(url);

		// 必须用event.newGuest来引用BrowserWindow实例
		evt.newGuest = win;
	});
});