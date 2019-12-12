const debug = require('debug')('electron-example:create_window');
const _ = require('lodash');
const { BrowserWindow } = require('electron');

// app 控制你的应用程序的事件生命周期 <https://electronjs.org/docs/api/app>
const DEFAULT_BROWSER_WINDOW_OPTIONS = {
	// 初始大小
	width: 800,
	height: 600,
	// 设置程序背景色
	backgroundColor: '#fff',
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
	// 模态窗口
	modal: false,
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
	titleBarStyle: 'default'
};


/**
 * 创建一个 browserwindow
 *
 * @param {*} url
 * @param {*} [options={}]
 * @returns
 */
function createWindow(url, options = {}) {
	debug('createWindow %s, %j', url, options);
	options = _.defaultsDeep(options, DEFAULT_BROWSER_WINDOW_OPTIONS);
	debug('options: %j', options);

	const win = new BrowserWindow(options);
	debug(url, /^(http|https|file):\/\//.test(url));
	if (/^(http|https|file):\/\//.test(url)) {
		win.loadURL(url);
	} else {
		win.loadFile(url);
	}

	if (options.webPreferences.devTools) {
		win.webContents.openDevTools();
	}

	if (!options.show) {
		win.once('ready-to-show', () => {
			win.show();
		});
	}

	win.on('close', (evt) => {
		debug('[close]', url);
	});

	win.on('closed', () => {
		debug('[closed]', url);
	});

	return win;
}


module.exports = createWindow;