const url = require('url');
const minimatch = require('minimatch');

const DOMAIN_WHITE_LIST = ['*.xdf.cn'];


function match(uri) {
	const { hostname } = url.parse(uri);
	for (const pattern of DOMAIN_WHITE_LIST) {
		const matched = minimatch(hostname, pattern);
		if (matched) return true;
	}

	return false;
}

module.exports = {
	match
};