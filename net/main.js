const debug = require('debug')('electron-example:main');
const path = require('path');
const { app, netLog } = require('electron');

const request = require('./src/request');
const createWindow = require('./src/create_window');
const { delay } = require('./utils');

app.on('ready', async () => {
	debug('ready');
	// 开始记录日志
	const logPath = path.join(app.getPath('logs'), 'net-log.json');
	await netLog.startLogging(logPath);
	
	createWindow('view/index.html', { show: true });
	
	try {
		const status = await request('https://coursebox.xdf.cn/_heartbeat');
		debug('coursebox status: %s', status);
	} catch (ignored) { }

	// 延迟 10s
	await delay('10s');
	// 停止日志记录
	await netLog.stopLogging();
	debug('logPath: %s', logPath);
});