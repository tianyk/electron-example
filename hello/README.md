### Hello Electron 

项目结构和`Node.js`项目一样，只是吧`node`运行时换成了`electron`。

```
npx electron main.js
```

国内安装`electron`会很慢，我们可以使用镜像。配置环境变量`ELECTRON_MIRROR`

Node.js 的模块都能拿来直接使用，对于C++模块需要使用 `electron-rebuild` 重新编译下。

```
npx electron-rebuild
```

#### 安装问题

1. 淘宝镜像安装失败

	镜像设置方法
	1. ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
	2. npm config set electron_mirror = https://npm.taobao.org/mirrors/electron/
	3. 项目内npm配置文件`.npmrc`文件

	```
	淘宝镜像版本号少了一个v，导致404
	https://npm.taobao.org/mirrors/electron/7.1.0/electron-v7.1.0-darwin-x64.zip   
	https://github.com/electron/electron/releases/download/v7.1.0/electron-v7.1.0-darwin-x64.zip

	https://github.com/electron/electron/releases/download/v4.0.4/electron-v4.0.4-linux-x64.zip
	|                                                     |       |                           |
	-------------------------------------------------------       -----------------------------
							|                                                   |
				mirror / nightly_mirror                     |    |         customFilename
														    ------
															  ||
														   customDir
	```

查看安装日志 
```
export DEBUG="@electron/get:index"
```

查看进度 
```
npm install --verbose electron
```

electron 使用 `@electron/get` 项目下载安装包，详细逻辑查看`node_modules/electron/install.js`。


环境变量<https://github.com/electron/electron/blob/38711233c50a6eeeb249dbd114696485267437ae/docs/api/environment-variables.md>
