const debug = require('debug')('electron-example:main');
require('./src/ipc');
const { delay } = require('./utils');
const { app } = require('electron');

const createWindow = require('./src/create_window');

app.on('ready', async () => {
	debug('ready');

	const win = createWindow('view/index.html', { show: true });

	await delay('5s');
	// 从主进程主动发送消息给渲染进程
	win.webContents.send('hi', 'from main process');
	// win.webContents.sendInputEvent({ type: 'mouseMove', x: 10, y: 10 });
});