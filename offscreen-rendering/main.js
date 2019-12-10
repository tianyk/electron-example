const debug = require('debug')('electron-example:main');
const { app } = require('electron');
app.disableHardwareAcceleration();

const createWindow = require('./src/create_window');

app.on('ready', async () => {
	debug('ready');
	const starWarsWin = createWindow('view/star_wars.html', {
		webPreferences: {
			offscreen: true
		}
	});

	const mainWin = createWindow('view/index.html', { show: true, opacity: 0.75, frame: false });
	starWarsWin.webContents.on('paint', (evt, dirty, image) => {
		debug('dirty: %j', dirty);
		image = image.resize({ width: 800, height: 600 });
		if (!mainWin.webContents.isDestroyed()) mainWin.webContents.send('background-image-update', image.toDataURL());
	});
	starWarsWin.webContents.frameRate = 24;
});