const ms = require('ms');

function timeout(time) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject(new Error('Operation timed out'));
		}, ms(time));
	});
}

function delay(time) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, ms(time));
	});
}

module.exports = {
	timeout, 
	delay
};