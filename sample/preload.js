const debug = require('debug')('electron-example:preload');

// 页面脚本运行前执行，不受 node integration 限制
debug('preload');