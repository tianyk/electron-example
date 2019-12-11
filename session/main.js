const debug = require('debug')('electron-example:main');
const pkg = require('./package.json');
const { app, session } = require('electron');

const createWindow = require('./src/create_window');

// 记录请求时间
const REQUEST_MAPS = new Map([
	['default', new Map()],
	['persist:xdf', new Map()]
]);

app.on('ready', async () => {
	debug('ready');
	const DEFAULT_UA = session.defaultSession.getUserAgent();
	const USER_AGENT = `${DEFAULT_UA} COURSEBOX/${pkg.version}`;

	const xdfSession = session.fromPartition('persist:xdf');
	// 重新设置UA
	xdfSession.setUserAgent(USER_AGENT);
	// 设置代理，部分网络走专线
	await xdfSession.setProxy({
		pacScript: 'https://assets.coursebox.xdf.cn/c2D4NijeWHGi_ZzuY4Jt-.js'
	});

	// 拦截器
	const requestFilter = {
		urls: ['http://*/*', 'https://*/*']
	};
	xdfSession.webRequest.onBeforeRequest(requestFilter, (details, cb) => {
		// debug('[onBeforeRequest] %d %s %s %s', details.id, details.method, details.url, details.resourceType);
		REQUEST_MAPS.get('persist:xdf').set(details.id, new Map([
			['t', Date.now()]
		]));
		cb({ cancel: false });
	});
	xdfSession.webRequest.onBeforeSendHeaders(requestFilter, (details, cb) => {
		// debug('[onBeforeSendHeaders] %d %s %s', details.id, details.method, details.url);
		cb({ cancel: false });
	});

	xdfSession.webRequest.onResponseStarted(requestFilter, (details) => {
		// debug('[onResponseStarted] %d %s %s', details.id, details.method, details.url);
		REQUEST_MAPS.get('persist:xdf').get(details.id).set('t0', Date.now());
	});

	xdfSession.webRequest.onHeadersReceived(requestFilter, (details, cb) => {
		// debug('[onHeadersReceived] %d %s %s', details.id, details.method, details.url);
		REQUEST_MAPS.get('persist:xdf').get(details.id).set('t1', Date.now());
		cb({ cancel: false });
	});

	xdfSession.webRequest.onCompleted(requestFilter, (details) => {
		// debug('[onCompleted] %d %s %d %s', details.id, details.method, details.statusCode, details.url);
		REQUEST_MAPS.get('persist:xdf').get(details.id).set('t2', Date.now());
		const request = REQUEST_MAPS.get('persist:xdf').get(details.id);

		if (request) debug('[onCompleted] %d %s %s t0: %d, t1: %d, t2: %d',
			details.id, details.method, details.url,
			(request.get('t0') - request.get('t')),
			(request.get('t1') - request.get('t')),
			(request.get('t2') - request.get('t')));
	});

	xdfSession.webRequest.onErrorOccurred(requestFilter, (details) => {
		debug('[onErrorOccurred] %d %s %s %s', details.id, details.method, details.url, details.error);
	});

	createWindow('view/index.html', { show: true, webPreferences: { session: xdfSession } });
});