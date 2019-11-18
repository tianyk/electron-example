const debug = require('debug')('electron-example:ipc');
const { app, ipcMain } = require('electron');

ipcMain.on('electron:relaunch', (evt) => {
	debug('[electron:relaunch]', evt.sender.getURL());
	// 只执行 relaunch 并不会退出应用，需要手动退出当前应用
	app.relaunch();
	app.quit();
});

ipcMain.on('electron:hide', (evt) => {
	debug('[electron:hide]', evt.sender.getURL());
	app.hide();
});