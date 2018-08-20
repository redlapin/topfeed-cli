const webpackServe = require("webpack-serve");
const debug = require("debug")("topfeed");
const buildConfig = require("../webpack-config");
function serve({ buildEnv, buildTarget, config }) {
	console.log("config:", config);
	const webpackConfig = buildConfig({
		buildEnv,
		buildTarget,
		configureWebpack: config.configureWebpack,
		config
	});
	debug("webpackConfig:", webpackConfig);
	const argv = {};
	webpackServe(argv, {
		port: config.port,
		config: webpackConfig,
		devMiddleware: {
			publicPath: config.publicPath
		}
	});
}
module.exports = serve;
