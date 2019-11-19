const debug = require('debug')('electron-example:main');
const path = require('path');
const { app, BrowserWindow } = require('electron');

const createWindow = require('./src/create_window');

app.on('ready', () => {
	const win = createWindow('view/index.html', {
		width: 513,
		height: 342,
		// titleBar 隐藏后将无法拖动
		titleBarStyle: 'hidden',
		// 不能改变大小
		resizable: false,
		// 禁用最大最小化
		minimizable: false,
		maximizable: false,
		// frame 创建一个无标题栏和窗口控制按钮的窗口
		frame: false,
		webPreferences: {
			devTools: false
		}
	});
});