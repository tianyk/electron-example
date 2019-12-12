const debug = require('debug')('electron-example:view:main.js');
// 录屏
const { desktopCapturer } = require('electron');

// 当前正在播放的媒体流
let currentStream;
// 播放
function play(stream) {
	if (!stream) throw new Error('stream should be MediaStream');
	stopRecord();

	// mediaRecorder = new MediaRecorder({
	// 	audioBitsPerSecond: 128000,
	// 	videoBitsPerSecond: 2500000,
	// 	mimeType: 'video/mp4'
	// });

	// mediaRecorder.ondataavailable = handleDataAvailable;
	// mediaRecorder.start();

	// function handleDataAvailable(evt) {
	// 	debug('data-available');
	// 	if (evt.data.size > 0) {
	// 		recordedChunks.push(evt.data);
	// 		console.log(recordedChunks);
	// 		download();
	// 	} else {
	// 		// ...
	// 	}
	// }

	currentStream = stream;
	// https://developer.mozilla.org/en-US/docs/Web/API/MediaStream
	debug('play', stream.id);
	const video = document.querySelector('#video-player');
	video.srcObject = stream;
	video.onloadedmetadata = (evt) => video.play();
}

// 停止录制
function stopRecord() {
	// https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack
	if (!currentStream) return;
	currentStream.getTracks().forEach((track) => track.stop());
	currentStream = null;
}

async function record(sourceId, options = {}) {
	if (!sourceId) throw new Error('require source');
	debug('sourceId', sourceId);
	const stream = await navigator.mediaDevices.getUserMedia({
		audio: false,
		video: {
			mandatory: {
				// 要从整个桌面同时捕获音频和视频 chromeMediaSource: 'desktop'
				chromeMediaSource: 'desktop',
				chromeMediaSourceId: sourceId,
				// minWidth: 1280,
				// minHeight: 720,
				// maxWidth: 1280,
				// maxHeight: 720,
				maxWidth: window.screen.width,
				maxHeight: window.screen.height
			}
		}
	});
	debug('stream: %s', stream.id);

	play(stream);
}

function getMediaSources(types = ['window', 'screen']) {
	return desktopCapturer.getSources({ types });
}

// 录制桌面
async function recordScreen() {
	debug('recordScreen');
	const sources = await desktopCapturer.getSources({ types: ['screen'] });
	debug('sources: %O', sources);

	await record(sources[0].id);
}

// 录制摄像头
async function recordCamera() {
	debug('recordCamera');
	// https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia
	const stream = await navigator.mediaDevices.getUserMedia({
		// audio: false,
		// audio: true,
		// OverConstrainedError 
		// 浏览器会试着满足这个请求参数，但是如果无法准确满足此请求中参数要求或者用户选择覆盖了请求中的参数时，有可能返回其它的分辨率。
		// 如果强制获取，浏览器不满足时会抛出 OverConstrainedError 异常
		// frameRate 设置帧率
		video: { width: 426, height: 240, frameRate: { ideal: 10, max: 15 } }
		// video: { width: 640, height: 360 }
	});

	play(stream);
}