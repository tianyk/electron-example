// Proxy Auto-Configuration (PAC) file
let proxy = 'PROXY 139.199.22.37:6379; DIRECT;';
let direct = 'DIRECT;';

function FindProxyForURL(url, host){
	if (/coursebox\.xdf\.cn$/.test(host)) {
		return proxy;
	} else {
		return direct;
	}
}