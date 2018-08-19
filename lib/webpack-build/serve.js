const debug = require("debug")("topfeed");
const webpack = require("webpack");
const ip = require("ip");
const express = require("express");
const webpackDevMiddleware = require("webpack-dev-middleware");
const logger = require("../logger");
const buildConfig = require("../webpack-config");
function serve({ buildEnv, buildTarget, config }) {
	const port = 4001;
	const app = express();
	let buildReady = false; // bundle finished
	const webpackConfig = buildConfig({
		buildEnv,
		buildTarget,
		configureWebpack: config.configureWebpack,
		config
	});
	const compiler = webpack(webpackConfig);
	const devMiddleware = webpackDevMiddleware(compiler, {
		noInfo: false,
		stats: {
			modules: false,
			colors: true,
			chunks: false
		}
	});
	devMiddleware.waitUntilValid(() => {
		buildReady = true;
		logger.success("build finished");
	});
	app.use(devMiddleware);
	const address = ip.address();
	app.listen(port, "0.0.0.0", err => {
		if (err) {
			logger.error(err);
			return;
		}
		debug("dev server started");
		logger.success("topfeed-dev-server: dev server is ready");
		logger.success(`local:\t>>> http://${address}:${port}`);
		if (!buildReady) {
			logger.log("topfeed-dev-server: wait until webpack build finished");
		}
	});
}
module.exports = serve;
