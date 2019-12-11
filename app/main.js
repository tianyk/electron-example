const path = require('path');
const debug = require('debug')('electron-example:main');
const { app, session } = require('electron');

// ipc 相关
require('./src/ipc');
const createWindow = require('./src/create_window');

const gotLock = app.requestSingleInstanceLock();
debug('gotLock', gotLock);
if (!gotLock) app.quit();

app.on('will-finish-launching', () => {
	// 当应用程序完成基础的启动的时候被触发。 在 Windows 和 Linux 中, will-finish-launching 事件与 ready 事件是相同的。
	debug('[will-finish-launching]');
});

app.on('window-all-closed', () => {
	// 默认行为是退出程序，我们如果想控制退出可以监听此事件。
	debug('[window-all-closed]');
	app.quit();
});

app.on('before-quit', (evt) => {
	// 程序退出前
	// evt.preventDefault() 会阻止退出
	debug('[before-quit]');
});

app.on('will-quit', (evt) => {
	// 程序退出前
	// evt.preventDefault() 会阻止退出
	debug('[will-quit]');
});

app.on('quit', () => {
	// 程序退出时
	debug('[quit]');
	// 删除已注册协议
	app.removeAsDefaultProtocolClient('electron');
});

app.on('browser-window-created', (evt, win) => {
	// 创建新的窗口时
	debug('[browser-window-created] %d', win.id);
});

app.on('web-contents-created', (evt, webContents) => {
	// 新的 webContents 被创建时 
	// ？？？此时拿不到getURL
	debug('[web-contents-created] url: %s', webContents.getURL());
});

app.on('renderer-process-crashed', (evt, webContents, killed) => {
	// 渲染进程崩溃或者被kill时
	debug('[renderer-process-crashed] url: %s, killed: %b', webContents.getURL(), killed);
});

app.on('session-created', (session) => {
	debug('[session-created]', session);
});


// 各种路径
debug('app.name: %s appPath: %s', app.name, app.getAppPath());
// 写日志、临时文件是我们尽量使用以下路径。统一、规范、避免权限问题
[
	'home',
	'appData',
	'userData',
	'cache',
	'temp',
	'exe',
	'module',
	'desktop',
	'documents',
	'downloads',
	'music',
	'pictures',
	'videos',
	'logs',
	'pepperFlashSystemPlugin'
]
	.forEach(name => {
		debug(`path.${name}: %s`, app.getPath(name));
	});

// 语言、地区
debug('Locale: %s, LocaleCountryCode: %s', app.getLocale(), app.getLocaleCountryCode());

// 程序是否是打包后的 可以用来区分dev和生产环境
debug('app.isPackaged', app.isPackaged);

debug('app.name%s, process.execPath: %s', app.name, process.execPath);
// 注册协议 electron://open-electron-window
debug('DefaultProtocolClient[electron]', app.isDefaultProtocolClient('electron'));
app.setAsDefaultProtocolClient('electron');

// 获得一把锁，可以用来控制同一时刻只允许一个程序在运行。
// requestSingleInstanceLock 并不像程序中的锁一样阻塞，它立即返回。锁在程序退出时会自动释放 app.releaseSingleInstanceLock 
const gotTheLock = app.requestSingleInstanceLock();
debug('getLocale', gotTheLock);
if (!gotTheLock) app.exit();

app.on('ready', () => {
	// 当 Electron 完成初始化时被触发。 app.isReady() 可以检测是否`ready`
	debug('[ready]');
	const win = createWindow('view/index.html', { show: true });
	session.fromPartition('persist:electron-example');
});

