const debug = require('debug')('demo:6:main');
const { app, BrowserWindow, ipcMain, contentTracing, Notification, globalShortcut } = require('electron');
const { getDoNotDisturb } = require('electron-notification-state');

const gotLock = app.requestSingleInstanceLock();
debug('gotLock', gotLock);


// 禁用GPU加速
// app.disableHardwareAcceleration()
// app 控制你的应用程序的事件生命周期 <https://electronjs.org/docs/api/app>

function createWindow(url, options = {}) {
	debug('createWindow %s, %j', url, options);
	options = {
		// 初始大小
		width: 800,
		height: 600,
		icon: __dirname + 'image/Fruit-1.png',
		webPreferences: {
			// nodejs 上下文 对于在线、或者第三方网页不建议开启，有安全问题 
			nodeIntegration: true,
			devTools: true,
			defaultEncoding: 'utf8',
			// 离屏渲染
			// offscreen: true
		},
		// 延迟显示 配合 ready-to-show 使用
		show: false,
		// 聚焦 否则启动后默认不是当前程序
		focusable: true,
		minWidth: 800,
		minHeight: 600,
		maxWidth: 800,
		maxHeight: 600,
		// 禁止改变尺寸
		resizable: false,
		// 不可最大化
		maximizable: false,
		// 是否可以最小化
		// minimizable:false,
		// 是否可关闭
		closable: true,
		// 用于在别的窗口上面，不可遮挡
		// alwaysOnTop: true,
		// 启动后会全屏 导致 maximizable: false 无效。
		fullscreen: false,
		// 设置为 false 后窗口将不能放大
		fullscreenable: true,
		// 窗口名字 会被<title>标签覆盖
		title: '窗口title',
		// 无边框窗口 注意：无边框时将看不到 关闭、放大、缩小窗口
		// frame: false,
		// title样式 默认显示title值 hidden时将不显示 注意，没有标题栏时将不能拖拽
		titleBarStyle: 'default',
		...options
	};

	debug('options: %j', options);
	const win = new BrowserWindow(options);
	debug(url, /^(http|https|file):\/\//.test(url));
	if (/^(http|https|file):\/\//.test(url)) {
		win.loadURL(url);
	} else {
		win.loadFile(url);
	}

	win.once('ready-to-show', () => {
		win.show();
		win.webContents.openDevTools();

		setTimeout(() => {
			win.flashFrame(true);
		}, 1000);
	});

	win.on('close', (evt) => {
		// preventDefault 将阻止关闭
		// evt.preventDefault();
	});

	win.on('closed', () => {
		debug('[closed]', url);
	});
	return win;
}

// 默认行为是退出程序，如果坚挺了用户可以控制是否退出
app.on('window-all-closed', () => {
	app.quit();
});

app.on('quit', () => {
	debug('quit');
});

app.on('ready', () => {
	debug('ready');
	debug('local', app.getLocale());
	const mainWindow = createWindow('index.html');

	let shortcutRegisterResult = globalShortcut.isRegistered('CommandOrControl+Shift+T');
	debug('before register 快捷键注册', shortcutRegisterResult);
	// 注册一个 'CommandOrControl+X' 的全局快捷键
	shortcutRegisterResult = globalShortcut.register('CommandOrControl+Shift+T', () => {
		debug('触发快捷键');
		const notify = new Notification({
			title: '快捷键',
			body: '触发了快捷键'
		});
		// 不同于浏览器的 Notification ，需要手动调用 show 才会显示
		notify.show();
	});

	debug('after register 快捷键注册', shortcutRegisterResult);
});