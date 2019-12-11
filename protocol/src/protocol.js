const { protocol, app } = require('electron');
const debug = require('debug')('electron-example:src:protocol');

app.on('ready', () => {
	protocol.registerHttpProtocol('cos', (request, cb) => {
		debug('protocol', request);
		const url = 'https://assets.coursebox.xdf.cn/' + request.url.substr(6);
		cb({ method: 'GET', url });
	}, (err) => {
		if (!err) debug('cos://注册完成。');
		else debug('cos://', '注册失败。');
	});
	
	
	protocol.registerStringProtocol('base64', (request, cb) => {
		debug('protocol', request);
		const text = Buffer.from(request.url.substr(9), 'base64').toString('utf8');
		cb({ data: text, mimeType: 'text/plain; charset=utf-8' });
	}, (err) => {
		if (!err) debug('base64://注册完成。');
		else debug('base64://', '注册失败。');
	});
});