const fs = require('fs');
const path = require('path');
const mime = require('mime-types');
const { protocol, app } = require('electron');
const debug = require('debug')('electron-example:src:protocol');

app.on('ready', () => {
	protocol.registerHttpProtocol('cos', (request, cb) => {
		debug('protocol', request);
		const url = 'https://assets.coursebox.xdf.cn/' + request.url.substr(6);

		// https://electronjs.org/docs/api/structures/protocol-response-upload-data
		cb({ method: 'GET', url });
	}, (err) => {
		if (!err) debug('cos://注册完成。');
		else debug('cos://', '注册失败。');
	});

	protocol.registerStringProtocol('base64', (request, cb) => {
		debug('protocol', request);
		const text = Buffer.from(request.url.substr(9), 'base64').toString('utf8');

		// https://electronjs.org/docs/api/structures/string-protocol-response
		cb({ data: text, mimeType: 'text/plain; charset=utf-8' });
	}, (err) => {
		if (!err) debug('base64://注册完成。');
		else debug('base64://', '注册失败。');
	});

	protocol.registerFileProtocol('assets', (request, cb) => {
		debug('protocol', request);
		// const 
		const filepath = request.url.substr(8);
		const realFilepath = path.join(__dirname, '../assets', filepath);
		debug('realFilepath: %s', realFilepath);

		// 错误码 https://cs.chromium.org/chromium/src/net/base/net_error_list.h
		if (!fs.existsSync(realFilepath)) return cb({ error: -6 });
		// const contentType = mime.contentType(path.extname(filepath));
		// cb({ path: realFilepath, headers: { 'content-type': contentType } });

		// https://electronjs.org/docs/api/structures/file-path-with-headers
		cb({ path: realFilepath });
	}, (err) => {
		if (!err) debug('assets://注册完成。');
		else debug('assets://', '注册失败。');
	});
});