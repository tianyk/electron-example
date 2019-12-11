const debug = require('debug')('electron-example:src:request');
const once = require('once');
const { net } = require('electron');

function request(url, options = {}) {
	if (typeof url === 'object') {
		options = url;
		url = undefined;
	}
	debug('request %s %o', url, options);

	return new Promise((_resolve, _reject) => {
		const resolve = once(_resolve);
		const reject = once(_reject);

		const req = net.request(url, options);

		let data = Buffer.alloc(0);
		req.on('response', (res) => {
			res.on('data', (d) => {
				data = Buffer.concat([data, d]);
			});

			res.on('end', () => {
				debug('data', data.toString('utf8'));
				resolve(data);
			});
		});

		// abort 不一定会触发error 
		req.on('error', (err) => {
			debug('[error]', err);
			reject(err);
		});

		// 主/被动终止
		req.on('aborted', () => {
			reject('aborted');
		});

		// close 始终触发
		req.on('close', () => {
			debug('[close]');
		});

		if (options.body) req.write(options.body);
		// 发出请求
		req.end();
	});
}

module.exports = request;
