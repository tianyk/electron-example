const debug = require('debug')('electron-example:src:ipc');
const os = require('os');
const { ipcMain } = require('electron');

ipcMain.on('ping', (evt) => {
	debug('ping');
	// 回复消息
	evt.reply('pong');
});

ipcMain.handle('getCPUs', async () => {
	return os.cpus();
});