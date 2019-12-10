const debug = require('debug')('electron-example:main');
const pkg = require('./package.json');
const { app, session } = require('electron');

const createWindow = require('./src/create_window');

app.on('ready', async () => {
	debug('ready');
	const SYSTEM_LOCAL = app.getLocale();
	const DEFAULT_UA = session.defaultSession.getUserAgent();
	session.defaultSession.setUserAgent(`${DEFAULT_UA} ELECTRON/${pkg.version}`, `${SYSTEM_LOCAL},en-US,zh-CN`);

	// 持久化 session 
	const persistSession = session.fromPartition('persist:electron-example:persist-session');
	const memorySession = session.fromPartition('electron-example:memory-session');

	const win1 = createWindow('https://assets.coursebox.xdf.cn/q0KyZDfCcuePCVpSi0rIR.html');
	// const win2 = createWindow('https://assets.coursebox.xdf.cn/q0KyZDfCcuePCVpSi0rIR.html', {
	// 	webPreferences: {
	// 		session: persistSession,
	// 		// partition: 'persist:electron-example:persist-session'
	// 	}
	// });
	// const win3 = createWindow('https://assets.coursebox.xdf.cn/q0KyZDfCcuePCVpSi0rIR.html', {
	// 	webPreferences: {
	// 		session: memorySession,
	// 		// partition: 'electron-example:memory-session'
	// 	}
	// });
});