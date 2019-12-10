const debug = require('debug')('electron-example:main');
const { app, session } = require('electron');

const createWindow = require('./src/create_window');

app.on('ready', async () => {
	debug('ready');
	const exampleSession = session.fromPartition('persist:electron-example:session');
	const win1 = createWindow('https://assets.coursebox.xdf.cn/q0KyZDfCcuePCVpSi0rIR.html');

	const win2 = createWindow('https://assets.coursebox.xdf.cn/q0KyZDfCcuePCVpSi0rIR.html', {
		webPreferences: {
			session: exampleSession,
			// partition: 'persist:electron-example:session1'
		}
	});
});