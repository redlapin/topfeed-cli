const webpackServe = require("webpack-serve");
const buildConfig = require("../webpack-config");
function serve({ buildEnv, buildTarget, config }) {
	const webpackConfig = buildConfig({
		buildEnv,
		buildTarget,
		configureWebpack: config.configureWebpack,
		config
	});
	const argv = {};
	webpackServe(argv, {
		port: config.port,
		config: webpackConfig,
		hotClient: false,
		devMiddleware: {
			publicPath: config.publicPath,
			headers: { "Access-Control-Allow-Origin": "*" }
		}
	});
}
module.exports = serve;
