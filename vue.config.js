const path = require('path');
const resolve = function (dir) {
	return path.join(__dirname, dir);
};

module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: false, // 是否开启eslint保存检测
	productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
	chainWebpack: (config) => {
		config.resolve.alias.set('@', resolve('src')).set('views', resolve('src/views'));
		config.optimization.runtimeChunk('single');
	},
	devServer: {
		// https://webpack.js.org/configuration/dev-server/
		host: '0.0.0.0',
		port: '8080',
		hot: true,
		// open: true,
		overlay: {
			warning: false,
			error: true
		},
		proxy: {
			'/api': {
				target: 'http://192.168.200.58:7810',
				// target: 'http://test.xxxx.com',
				changeOrigin: true,
				secure: false,
				// ws: true, // 是否启用websockets
				proxyTimeout: 100 * 60 * 1000,
				timeout: 100 * 60 * 1000,
				pathRewrite: {
					'^/api': '/api'
				}
			},
			'/ibi/': {
        target: 'http://test.xxxx.com',
				changeOrigin: true,
				secure: false,
				// ws: true, // 是否启用websockets
				proxyTimeout: 100 * 60 * 1000,
				timeout: 100 * 60 * 1000,
				pathRewrite: {
					'^/api': '/api'
				}
			}
		}
	}
};
