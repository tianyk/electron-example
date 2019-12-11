const os = require('os');

function getCPUs() {
	return os.cpus();
}

global.getCPUs = getCPUs;